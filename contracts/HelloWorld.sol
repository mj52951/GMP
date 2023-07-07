//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7; 

contract HelloWorld {
    event MessageSent(string message); 

    function emitMessage(string memory message) external{
        emit MessageSent(message);
    }
}