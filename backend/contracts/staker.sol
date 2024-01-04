// SPDX-License-Identifier: MIT
pragma solidity 0.8.20; //Do not change the solidity version as it negativly impacts submission grading

import "hardhat/console.sol";
import "./ExampleExternalContract.sol";

contract Staker {
	ExampleExternalContract public exampleExternalContract;

	//mapping to track balances
	mapping(address => uint256) public balances;
	mapping(address => uint256) public savingsTimestamps;

	uint256 public constant threshold = 1 ether;
	bool public openForWithdraw;

	uint256 public deadline = block.timestamp + 72 hours;
	// Constants for credit score calculation
	uint256 public constant SAVINGS_INTERVAL = 1 days;
	uint256 public constant MAX_CREDIT_SCORE = 100;

	//Events
	event Stake(address indexed staker, uint256 amount);
	event WithdrawEnabled(bool enabled);

	constructor(address exampleExternalContractAddress) {
		exampleExternalContract = ExampleExternalContract(
			exampleExternalContractAddress
		);
	}

	// Collect funds in a payable `stake()` function and track individual `balances` with a mapping:
	function stake() public payable {
		balances[msg.sender] += msg.value;
		emit Stake(msg.sender, msg.value);
	}

	// (Make sure to add a `Stake(address,uint256)` event and emit it for the frontend `All Stakings` tab to display)

	modifier notCompleted() {
		require(
			!exampleExternalContract.completed(),
			"Staking process already completed"
		);
		_;
	}

	// After some `deadline` allow anyone to call an `execute()` function
	function execute() external notCompleted {
		require(block.timestamp > deadline, "Deadline has not expired");
		if (address(this).balance >= threshold) {
			// If the deadline has passed and the threshold is met, it should call `externalContract.complete{value: address(this).balance}()`
			exampleExternalContract.complete{ value: address(this).balance }();
		} else {
			// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance
			openForWithdraw = true;
			emit WithdrawEnabled(true);
		}
	}

	// If the deadline has passed and the threshold is met, it should call `exampleExternalContract.complete{value: address(this).balance}()`

	// If the `threshold` was not met, allow everyone to call a `withdraw()` function to withdraw their balance

	// Add a `timeLeft()` view function that returns the time left before the deadline for the frontend
	function timeLeft() public view returns (uint256) {
		if (block.timestamp >= deadline) {
			return 0;
		}
		return deadline - block.timestamp;
	}

	//function to withdraw funds
	function withdraw(uint256 amount) external {
		require(amount > 0, "Amount must be greater than 0");
		require(balances[msg.sender] >= amount, "Insufficient balance");

		balances[msg.sender] -= amount;
		payable(msg.sender).transfer(amount);
	}

	// Add the `receive()` special function that receives eth and calls stake()
	receive() external payable {
		stake();
	}
}