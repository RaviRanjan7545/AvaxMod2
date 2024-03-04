// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract AmazonTVSubscription {
    
    address public owner;
    uint256 password;
    mapping(address => bool) hasAccess;
    mapping(address => bool) loggedIn;
    uint256 accessMember;

    constructor() {
        owner = msg.sender;
        password = 12345;
        hasAccess[owner] = true;
        accessMember = 1;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function changePassword(uint256 oldPassword, uint256 newPassword) public {
        require(owner == msg.sender, "Only owner can change the password");
        require(oldPassword == password, "Password doesn't match");
        password = newPassword;
    }

    function grantAccess(address addr) public {
        require(msg.sender == owner, "You don't have access to execute this function");
        require(accessMember < 4, "Each account can be linked to 4 devices only");
        hasAccess[addr] = true;
        loggedIn[addr] = false;
        accessMember++;
    }
    
    function revokeAccess(address addr) public {
        require(msg.sender == owner, "You don't have access to execute this function");
        hasAccess[addr] = false;
        loggedIn[addr] = false;
        accessMember--;
    }

    function loginAccount(address addr, uint256 key) public {
        require(hasAccess[addr], "You don't have access to watch");
        require(!loggedIn[addr], "Already logged in");
        require(password == key, "Wrong Password");
        loggedIn[addr] = true;
    }

    function getContractAddress() public view returns (address) {
        return address(this);
    }
}
