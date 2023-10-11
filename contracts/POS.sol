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

    // Struct to represent sales
    struct Receipt {
        uint256 id;
        address buyer;
        uint256 productId;
        uint256 quantity;
        uint256 totalAmount;
    }

   enum payMethod {
   ETH
   USDT
   }

    // Define an event when a sale is made
    event Sale(address indexed buyer, uint256 productId, uint256 quantity, uint256 totalAmount);

 // Event to log refunds
    event Refund(address indexed buyer, uint256 productId, uint256 totalAmount);

    // Constructor function to set the admin as the contract owner
    constructor(address paymentTokenAddress) {
        admin = msg.sender;
        // set payment ERC20 token
        usdt = IERC20(paymentTokenAddress);
    }

    // Function to add items to the inventory
   function addProduct(uint256 _productId, string memory _name, uint256 _price, uint256 _initialInventory) public {
        require(msg.sender == admin, "Only the admin can add items to the inventory");
         require(products[_productId].id == 0, "Product ID already exists");
         
         products[_productId] = Product(_productId, _name, _price);
        productInventory[_productId] = _initialInventory;
        
    }


    // Function to remove items from the inventory
    function removeItem(uint256 memory productId, uint quantity) public {
        require(msg.sender == admin, "Only the admin can remove items from the inventory");
        require(inventory[item] >= quantity, "Not enough items in the inventory");
        productInventory[_productId] += _initialInventory;
    }

    // Function to make a sale
    function makeSale(string memory item, uint quantity, uint price) public payable {
        require(inventory[item] >= quantity, "Not enough items in the inventory");
        require(msg.value == quantity * price, "Incorrect payment amount");

        // Update the inventory
        productInventory[_productId] -= _quantity;

        // Emit the Sale event
        emit Sale(msg.sender, _quantity, _productId);
    }
function refund(uint256 _receiptId) external {
        require(_receiptId < numTransactions, "Invalid receipt");
        Receipt memory _receipt = receipts[_receiptId];
        require(_receipt.buyer == msg.sender, "Only buyer can get a refund");

        uint256 _productId = _receipt.productId;
        uint256 _quantity = _receipt.quantity;
        uint256 _totalAmount = _receipt.totalAmount;

        // update sales stuff
        productInventory[_productId] += _quantity;
        productSales[_productId] -= _quantity;
        totalSales -= _totalAmount;
         receipts[numTransactions] = Receipt(numTransactions, msg.sender, _productId, _quantity, totalPrice);
        numTransactions++;
        

        // issue refund
        payable(msg.sender).transfer(_totalAmount); // unsafe, should include checks to make sure there's a balance

        emit Refund(msg.sender, _productId, _totalAmount);
    }

    function withdraw(uint256 _amount) public payable onlyAdmin {
        uint256 balance = IERC20(tokenAddress).balanceOf(address(this));
         require(_amount <= address(this).balance, "Insufficient contract balance");

        IERC20(tokenAddress).transfer(admin, balance);
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

function purchaseProductwithETH () {(uint256 _productId, uint256 _quantity, uint256 _amount) private {
        require(msg.value >= _amount, "Insufficient funds");
    }

     function _purchaseProductWithStable(uint256 _productId, uint256 _quantity, uint256 _amount) private {
        require(usdt.transferFrom(msg.sender, address(this), _amount), "Transfer failed");
    }