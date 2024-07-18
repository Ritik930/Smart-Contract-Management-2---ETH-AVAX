// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint256 public lastTransactionTime;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Transfer(address indexed from, address indexed to, uint256 amount);

    constructor(uint256 initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        lastTransactionTime = block.timestamp;
    }

    function getBalance() public view returns (uint256) {
        return balance;
    }

    function checkLastTransaction() public view returns (uint256) {
        return lastTransactionTime;
    }

    function deposit(uint256 _amount) public payable {
        uint256 _previousBalance = balance;

        require(msg.sender == owner, "You are not the owner of this account");

        balance += _amount;

        assert(balance == _previousBalance + _amount);

        lastTransactionTime = block.timestamp;

        emit Deposit(_amount);
    }

    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        balance -= _withdrawAmount;

        assert(balance == (_previousBalance - _withdrawAmount));

        lastTransactionTime = block.timestamp;

        emit Withdraw(_withdrawAmount);
    }

    function transfer(address payable _to, uint256 _amount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint256 _previousBalance = balance;
        if (balance < _amount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _amount
            });
        }

        balance -= _amount;
        _to.transfer(_amount);

        assert(balance == (_previousBalance - _amount));

        lastTransactionTime = block.timestamp;

        emit Transfer(msg.sender, _to, _amount);
    }
}
