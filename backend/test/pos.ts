
import { expect } from "chai";
import { ethers } from "hardhat";
import { MockUSDT, PointOfSale } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";


describe("PointOfSale contract", function () {
  let owner: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let pointOfSale: PointOfSale;
  let mockUsdt: MockUSDT;

  const payWithEther = 0;
  const payWithUsdt = 1;
  //const {
    //loadFixture,
 // } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  
  describe("Purchase products with ETH", function () {
    //async function deployPointOfSaleFixture() {
    before(async function () {
      [owner, user1, user2] = await ethers.getSigners();
      // Deploy the USDT faucet contract
      const MockUSDT = await ethers.getContractFactory("MockUSDT");
      mockUsdt = await MockUSDT.deploy();
      await mockUsdt.waitForDeployment();

      // Deploy the PointOfSale contract
      const PointOfSale = await ethers.getContractFactory("PointOfSale");
      pointOfSale = await PointOfSale.deploy(await mockUsdt.getAddress());
      await pointOfSale.waitForDeployment();
//return { PointOfSale, owner, user1, user2 };
        
    });
//const { pointOfSale, owner } = await loadFixture(deployPointOfSaleFixture);

    it("Should add a product", async function () {
      // Add a product by the owner
      await pointOfSale.addProduct(1, "Product 1", ethers.parseEther("1"), 10);

      // Check if the product has been added
      const product = await pointOfSale.products(1);
      expect(product.name).to.equal("Product 1");
      expect(product.price).to.equal(ethers.parseEther("1"));
    });

    it("Should purchase a product", async function () {
      // User1 purchases a product
      await pointOfSale
        .connect(user1)
        .purchaseProduct(1, 3, payWithEther, { value: ethers.parseEther("3") });

      // Check if the inventory and sales data have been updated
      const inventory = await pointOfSale.productInventory(1);
      const sales = await pointOfSale.productSales(1);
      const totalSales = Number(await pointOfSale.totalSales());

      expect(inventory).to.equal(7);
      expect(sales).to.equal(3);
      expect(totalSales).to.equal(Number(ethers.parseEther("3")));
    });

    it("Should not allow purchasing without sufficient funds", async function () {
      // User2 tries to purchase a product without enough funds
      await expect(
        pointOfSale.connect(user2).purchaseProduct(1, 5, payWithEther, {
          value: ethers.parseEther("4"),
        })
      ).to.be.revertedWith("Insufficient funds");
    });

    it("Should withdraw funds by the owner", async function () {
      // Owner withdraws funds
      const ownerAddress = await owner.getAddress();
      const ownerBalanceBefore = await ethers.provider.getBalance(ownerAddress);
      await pointOfSale.connect(owner).withdrawFunds(ethers.parseEther("3"));
      const ownerBalanceAfter = await ethers.provider.getBalance(ownerAddress);

      expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
    });
  });

 
  describe("Purchase products with USDT", function () {

    before(async function () {
        [owner, user1, user2] = await ethers.getSigners();

        // Deploy the USDT faucet contract
        const MockUSDT = await ethers.getContractFactory("MockUSDT");
        mockUsdt = await MockUSDT.deploy();
        await mockUsdt.waitForDeployment();

        // Deploy the PointOfSale contract
        const PointOfSale = await ethers.getContractFactory("PointOfSale");
        pointOfSale = await PointOfSale.deploy(await mockUsdt.getAddress());
        await pointOfSale.waitForDeployment();

        const THOUSAND_DOLLARS = ethers.parseUnits("1000", 6)
        const EIGHTY_DOLLARS = ethers.parseUnits("80", 6)

        mockUsdt.connect(owner).transfer(user1.address, THOUSAND_DOLLARS);
        mockUsdt.connect(owner).transfer(user2.address, EIGHTY_DOLLARS);
    });

    it("Should add a product", async function () {
        const priceInUsd = ethers.parseUnits("20", 6) // Represents $20 price
        // Add a product by the owner
        await pointOfSale.addProduct(1, "Product 1", priceInUsd, 10);

        // Check if the product has been added
        const product = await pointOfSale.products(1);
        expect(product.name).to.equal("Product 1");
        expect(product.price).to.equal(priceInUsd);
    });

    it("Should purchase a product", async function () {
        const productId = 1
        const productQuantity = 3
        const product = await pointOfSale.products(productId);
        
        const paymentPrice = Number(product[2]) * productQuantity
        await mockUsdt.connect(user1).approve(pointOfSale.target, paymentPrice)
        // User1 purchases a product
        await pointOfSale.connect(user1).purchaseProduct(productId, productQuantity, payWithUsdt);

        // Check if the inventory and sales data have been updated
        const inventory = await pointOfSale.productInventory(1);
        const sales = await pointOfSale.productSales(1);
        const totalSales = Number(await pointOfSale.totalSales());

        expect(inventory).to.equal(7);
        expect(sales).to.equal(3);
        expect(totalSales).to.equal(Number(ethers.parseUnits("60", 6)));
    });

    it("Should not allow purchasing without sufficient funds", async function () {
        // User2 tries to purchase a product without enough funds
        await mockUsdt.connect(user2).approve(pointOfSale.target, ethers.parseUnits("1000", 6))

        /** Solution to expected error to be ... but got a custom error
            // - Create custom error messages that are different from string messages that we're used to
            // - When testing, use .revertedWithCustomError(contractInstance, 'NameOfCustomErrorInContract')
            // - Learn more here: https://blog.openzeppelin.com/defining-industry-standards-for-custom-error-messages-to-improve-the-web3-developer-experience
            // - OpenZeppelin's custom error(on line 195): https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol
        */
        await expect(
            pointOfSale.connect(user2).purchaseProduct(1, 5, payWithUsdt )
        ).to.be.revertedWithCustomError(mockUsdt, 'ERC20InsufficientBalance');
    });

    it("Should withdraw funds by the owner", async function () {
        // Owner withdraws funds

        const contractStoreBalance = await mockUsdt.balanceOf(pointOfSale.target)

        const ownerAddress = await owner.getAddress();
        const ownerBalanceBefore = await mockUsdt.balanceOf(ownerAddress);
        
        await pointOfSale.connect(owner).withdrawFundsUsdt(contractStoreBalance);
        const ownerBalanceAfter = await mockUsdt.balanceOf(ownerAddress);

        expect(ownerBalanceAfter).to.be.gt(ownerBalanceBefore);
        expect(await mockUsdt.balanceOf(pointOfSale.target)).to.be.eq(0)
    });

})

  describe("Refunds", function () {
    before(async function () {
      [owner, user1, user2] = await ethers.getSigners();

      // Deploy the USDT faucet contract
      const MockUSDT = await ethers.getContractFactory("MockUSDT");
      mockUsdt = await MockUSDT.deploy();
      await mockUsdt.waitForDeployment();

      // Deploy the PointOfSale contract
      const PointOfSale = await ethers.getContractFactory("PointOfSale");
      pointOfSale = await PointOfSale.deploy(await mockUsdt.getAddress());
      await pointOfSale.waitForDeployment();

      mockUsdt.connect(owner).transfer(user1.address, 1000);
      mockUsdt.connect(owner).transfer(user2.address, 1000);
    });

    it("Should reject the refund", async function () {
      // customer asks for a refund
      const receiptId = 0;
      const invalidReceiptId = 2;
      // Add a product by the owner
      await pointOfSale.addProduct(1, "Product 1", ethers.parseEther("1"), 10);
      // Purchase a product
      await pointOfSale.connect(user1).purchaseProduct(1, 3, payWithEther, {
        value: ethers.parseEther("15"),
      });

      // User1 tries to get a refund with an invalid receipt id
      await expect(
        pointOfSale.connect(user1).refund(invalidReceiptId)
      ).to.be.revertedWith("Invalid receipt");

      // User2 tries to get a refund when they haven't purchased that item
      await expect(
        pointOfSale.connect(user2).refund(receiptId)
      ).to.be.revertedWith("Only buyer can get a refund");
    });

    it("Should refund the customer", async function () {
      // User 1 asks for a refund and gets it

      const receiptId = 0;
      const userAddress = await user1.getAddress();
      const user1BalanceBefore = await ethers.provider.getBalance(userAddress);

      await expect(pointOfSale.connect(user1).refund(receiptId)).to.emit(
        pointOfSale,
        "Refund"
      );

      const user1BalanceAfter = await ethers.provider.getBalance(userAddress);

      expect(user1BalanceAfter).to.be.gt(user1BalanceBefore);
    });
  });
});
