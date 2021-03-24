// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    string constant NO_BALANCE = "003009";

    // User balances
    mapping(address => uint256) internal balances;

    // Log Deposit event
    event LogDeposit(address sender, uint256 amount);

    // Log Transfer event
    event LogTransfer(address sender, address to, uint256 amount);

    // Log Withdraw
    event LogWithdraw(address to, uint256 amount);

    // Deposit Function
    function _deposit(uint256 value) internal returns (bool success) {
        uint256 valueInWei = value * (1 wei);
        balances[msg.sender] += valueInWei;
        emit LogDeposit(msg.sender, valueInWei);
        return true;
    }

    // Transfer some ethers to someone, used to buy function
    function _transferEthersToContract(
        address _from,
        address _to,
        uint256 _value
    ) internal {
        balances[_to] += _value;
        emit LogTransfer(_from, _to, _value);
    }

    // Withdraw all ethers
    function withdrawAll(address payable to) external returns (bool success) {
        require(balances[to] != 0, NO_BALANCE);
        to.transfer(balances[to]);
        emit LogWithdraw(to, balances[to]);
        balances[to] = 0;
        return true;
    }

    // Get balance
    function getBalance(address _owner) external view returns (uint256) {
        return balances[_owner];
    }
}
