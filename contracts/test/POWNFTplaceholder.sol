//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.0;

//For testing AtomReader
contract POWNFTplaceholder{
    bytes32[] public hashes;

    function hashOf(uint _tokenId) external view returns(bytes32){
        return hashes[_tokenId - 1];
    }

    function totalSupply() external view returns (uint256){
        return hashes.length;
    }

    function pushHash(bytes32 hash) public{
        hashes.push(hash);
    }
}