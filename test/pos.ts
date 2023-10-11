import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("PointOfSale contract", function () {
    let owner: any;
    let user1: any;
    let user2: any;
    let pointOfSale: any;
    let mockUsdt: any;

    const payWithEther = 0
    const payWithUsdt = 1

    describe("Purchase products with ETH", function () {

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
            await pointOfSale.connect(user1).purchaseProduct(1, 3, payWithEther,  { value: ethers.parseEther("3") });

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
                pointOfSale.connect(user2).purchaseProduct(1, 5, payWithEther, { value: ethers.parseEther("4") })
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

    })

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

            mockUsdt.connect(owner).transfer(user1.address, 1000);
            mockUsdt.connect(owner).transfer(user2.address, 1000);
        });

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
            await pointOfSale.connect(user1).purchaseProduct(1, 3, payWithUsdt);

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
                pointOfSale.connect(user2).purchaseProduct(1, 5, payWithEther, { value: ethers.parseEther("4") })
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
            await pointOfSale.connect(user1).purchaseProduct(1, 3, payWithEther, { value: ethers.parseEther("3") });

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

            await expect(
                pointOfSale.connect(user1).refund(receiptId)
            ).to.emit(pointOfSale, "Refund");

            const user1BalanceAfter = await ethers.provider.getBalance(userAddress);

            expect(user1BalanceAfter).to.be.gt(user1BalanceBefore);
        });
    });
});