// SPDX-License-Identifier: MIT

pragma solidity ^0.7.3;

import "./Assimilators.sol";

import "./DFXStorage.sol";

import "./lib/UnsafeMath64x64.sol";
import "./lib/ABDKMath64x64.sol";

import "./CurveMath.sol";

library ProportionalLiquidity {
    using ABDKMath64x64 for uint256;
    using ABDKMath64x64 for int128;
    using UnsafeMath64x64 for int128;

    event Transfer(address indexed from, address indexed to, uint256 value);

    int128 public constant ONE = 0x10000000000000000;
    int128 public constant ONE_WEI = 0x12;

    function proportionalDeposit(DFXStorage.Curve storage curve, uint256 _deposit)
        external
        returns (uint256 curves_, uint256[] memory)
    {
        int128 __deposit = _deposit.divu(1e18);

        uint256 _length = curve.assets.length;

        uint256[] memory deposits_ = new uint256[](_length);

        (int128 _oGLiq, int128[] memory _oBals) = getGrossLiquidityAndBalances(curve);

        if (_oGLiq == 0) {
            for (uint256 i = 0; i < _length; i++) {
                deposits_[i] = Assimilators.intakeNumeraire(curve.assets[i].addr, __deposit.mul(curve.weights[i]));
            }
        } else {
            int128 _multiplier = __deposit.div(_oGLiq);

            for (uint256 i = 0; i < _length; i++) {
                deposits_[i] = Assimilators.intakeNumeraire(curve.assets[i].addr, _oBals[i].mul(_multiplier));
            }
        }

        int128 _totalShells = curve.totalSupply.divu(1e18);

        int128 _newShells = _totalShells > 0 ? __deposit.div(_oGLiq).mul(_totalShells) : __deposit;

        requireLiquidityInvariant(curve, _totalShells, _newShells, _oGLiq, _oBals);

        mint(curve, msg.sender, curves_ = _newShells.mulu(1e18));

        return (curves_, deposits_);
    }

    function viewProportionalDeposit(DFXStorage.Curve storage curve, uint256 _deposit)
        external
        view
        returns (uint256 curves_, uint256[] memory)
    {
        int128 __deposit = _deposit.divu(1e18);

        uint256 _length = curve.assets.length;

        (int128 _oGLiq, int128[] memory _oBals) = getGrossLiquidityAndBalances(curve);

        uint256[] memory deposits_ = new uint256[](_length);

        if (_oGLiq == 0) {
            for (uint256 i = 0; i < _length; i++) {
                deposits_[i] = Assimilators.viewRawAmount(curve.assets[i].addr, __deposit.mul(curve.weights[i]));
            }
        } else {
            int128 _multiplier = __deposit.div(_oGLiq);

            for (uint256 i = 0; i < _length; i++) {
                deposits_[i] = Assimilators.viewRawAmount(curve.assets[i].addr, _oBals[i].mul(_multiplier));
            }
        }

        int128 _totalShells = curve.totalSupply.divu(1e18);

        int128 _newShells = _totalShells > 0 ? __deposit.div(_oGLiq).mul(_totalShells) : __deposit;

        curves_ = _newShells.mulu(1e18);

        return (curves_, deposits_);
    }

    function proportionalWithdraw(DFXStorage.Curve storage curve, uint256 _withdrawal)
        external
        returns (uint256[] memory)
    {
        uint256 _length = curve.assets.length;

        (int128 _oGLiq, int128[] memory _oBals) = getGrossLiquidityAndBalances(curve);

        uint256[] memory withdrawals_ = new uint256[](_length);

        int128 _totalShells = curve.totalSupply.divu(1e18);
        int128 __withdrawal = _withdrawal.divu(1e18);

        int128 _multiplier = __withdrawal.mul(ONE - curve.epsilon).div(_totalShells);

        for (uint256 i = 0; i < _length; i++) {
            withdrawals_[i] = Assimilators.outputNumeraire(
                curve.assets[i].addr,
                msg.sender,
                _oBals[i].mul(_multiplier)
            );
        }

        requireLiquidityInvariant(curve, _totalShells, __withdrawal.neg(), _oGLiq, _oBals);

        burn(curve, msg.sender, _withdrawal);

        return withdrawals_;
    }

    function viewProportionalWithdraw(DFXStorage.Curve storage curve, uint256 _withdrawal)
        external
        view
        returns (uint256[] memory)
    {
        uint256 _length = curve.assets.length;

        (, int128[] memory _oBals) = getGrossLiquidityAndBalances(curve);

        uint256[] memory withdrawals_ = new uint256[](_length);

        int128 _multiplier = _withdrawal.divu(1e18).mul(ONE - curve.epsilon).div(curve.totalSupply.divu(1e18));

        for (uint256 i = 0; i < _length; i++) {
            withdrawals_[i] = Assimilators.viewRawAmount(curve.assets[i].addr, _oBals[i].mul(_multiplier));
        }

        return withdrawals_;
    }

    function getGrossLiquidityAndBalances(DFXStorage.Curve storage curve)
        internal
        view
        returns (int128 grossLiquidity_, int128[] memory)
    {
        uint256 _length = curve.assets.length;

        int128[] memory balances_ = new int128[](_length);

        for (uint256 i = 0; i < _length; i++) {
            int128 _bal = Assimilators.viewNumeraireBalance(curve.assets[i].addr);

            balances_[i] = _bal;
            grossLiquidity_ += _bal;
        }

        return (grossLiquidity_, balances_);
    }

    function requireLiquidityInvariant(
        DFXStorage.Curve storage curve,
        int128 _curves,
        int128 _newShells,
        int128 _oGLiq,
        int128[] memory _oBals
    ) private view {
        (int128 _nGLiq, int128[] memory _nBals) = getGrossLiquidityAndBalances(curve);

        int128 _beta = curve.beta;
        int128 _delta = curve.delta;
        int128[] memory _weights = curve.weights;

        int128 _omega = CurveMath.calculateFee(_oGLiq, _oBals, _beta, _delta, _weights);

        int128 _psi = CurveMath.calculateFee(_nGLiq, _nBals, _beta, _delta, _weights);

        CurveMath.enforceLiquidityInvariant(_curves, _newShells, _oGLiq, _nGLiq, _omega, _psi);
    }

    function burn(
        DFXStorage.Curve storage curve,
        address account,
        uint256 amount
    ) private {
        curve.balances[account] = burnSub(curve.balances[account], amount);

        curve.totalSupply = burnSub(curve.totalSupply, amount);

        emit Transfer(msg.sender, address(0), amount);
    }

    function mint(
        DFXStorage.Curve storage curve,
        address account,
        uint256 amount
    ) private {
        curve.totalSupply = mintAdd(curve.totalSupply, amount);

        curve.balances[account] = mintAdd(curve.balances[account], amount);

        emit Transfer(address(0), msg.sender, amount);
    }

    function mintAdd(uint256 x, uint256 y) private pure returns (uint256 z) {
        require((z = x + y) >= x, "Shell/mint-overflow");
    }

    function burnSub(uint256 x, uint256 y) private pure returns (uint256 z) {
        require((z = x - y) <= x, "Shell/burn-underflow");
    }
}