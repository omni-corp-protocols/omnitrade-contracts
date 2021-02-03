// SPDX-License-Identifier: MIT

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

pragma solidity ^0.7.3;

import "./lib/ABDKMath64x64.sol";

import "./DFXStorage.sol";

contract DFX is DFXStorage {
    using ABDKMath64x64 for int128;

    modifier onlyOwner() {
        require(msg.sender == owner, "!owner");
        _;
    }

    constructor(
        address _owner,
        address _token0,
        address _token1,
        uint256 _weight0,
        uint256 _weight1
    ) {
        owner = _owner;

        curve.token0 = _token0;
        curve.token1 = _token1;

        curve.weight0 = ABDKMath64x64.fromUInt(_weight0);
        curve.weight1 = ABDKMath64x64.fromUInt(_weight1);
    }
}