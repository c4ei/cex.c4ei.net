// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract WalletContract {

    uint256 private constant MIN = 10000000000000000; // 0.01 
    address private constant HOT_WALLET = 0x6F58aaFc6Ecd71897645A0DcDBe63622Df9ECF2b; //c4ei

    event DepositedOnMetaDapp();

    function forward() private {
        if(msg.value >= MIN){
            (bool success, ) = payable(HOT_WALLET).call{value: address(this).balance}("");
            require(success);
            emit DepositedOnMetaDapp();
        }
    }

    receive() external payable { forward();}
    fallback() external payable { forward();}
}