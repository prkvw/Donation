// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// Define the contract
contract PointOfSale {
    // Define the admin as the contract owner
    address public owner;  // The owner of the contract
    uint256 public totalSales;  // Total sales amount
    uint256 public numTransactions;  // Total number of transactions
    IERC20 usdt;


    // Mapping to store products by their IDs
    mapping(uint256 => Product) public products;

    // Mapping to track the inventory of each product
    mapping(uint256 => uint256) public productInventory;

    // Mapping to keep track of product sales
    mapping(uint256 => uint256) public productSales;

    // Mapping to track receipts
    mapping(uint256 => Receipt) public receipts;


    // Define a struct to represent a product
   struct Product {
    productId,
    price,
    title,
   }

   enum payMethod {
   ETH
   USDT
   }

    // Define an event to emit when a sale is made
    event Sale(string item, uint quantity, uint price, uint total);

    // Constructor function to set the admin as the contract owner
    constructor() {
        admin = msg.sender;
    }

    // Function to add items to the inventory
    function addItem(string memory item, uint quantity) public {
        require(msg.sender == admin, "Only the admin can add items to the inventory");
        inventory[item] += quantity;
    }

    // Function to remove items from the inventory
    function removeItem(string memory item, uint quantity) public {
        require(msg.sender == admin, "Only the admin can remove items from the inventory");
        require(inventory[item] >= quantity, "Not enough items in the inventory");
        inventory[item] -= quantity;
    }

    // Function to make a sale
    function makeSale(string memory item, uint quantity, uint price) public payable {
        require(inventory[item] >= quantity, "Not enough items in the inventory");
        require(msg.value == quantity * price, "Incorrect payment amount");

        // Update the inventory
        inventory[item] -= quantity;

        // Emit the Sale event
        emit Sale(item, quantity, price, quantity * price);
    }
    function withdraw(address tokenAddress) public onlyAdmin {
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
        require(balance > 0, "No funds to withdraw");

        IERC20(tokenAddress).transfer(admin, balance);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

function purchaseProductwithETH () {
require

    function purchaseProductwithStable () {
require

    }
}