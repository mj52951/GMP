//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7; 

contract HelloWorld {
    event MessageSent(string message, address depositor); 

    function emitMessage(address depositor, string memory message) external{
        
        emit MessageSent(message, depositor);
    }
}