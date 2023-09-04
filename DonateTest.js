import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

const {
    time,
    loadFixture,
  } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const { expect } = require("chai");

describe("Donate Contract", function () {
  let Donate;
  let donate;
  let owner;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
    Donate = await ethers.getContractFactory("Donate");
    donate = await Donate.deploy(ethers.parseEther("1000")); // Deploy with a targetAmount of 1000 ETH in wei
    await donate.deployed();

    // non zero donation
      it("should not allow a user to donate to the contract if amount is 0", async function () {
      await expect(donationContract.connect(donor1).donate("purpose", { value: 0 }))
      .to.be.revertedWith("Donation amount must be greater than 0");
    });

      //deploy 
      it("should run donate function when funds are sent to contract", async function () {
      const beneficiary1DonationAmountBefore = await donationContract.getAmountReceived(beneficiary1.address);
      const tx = await donor1.sendTransaction({
        to: donationContract.target,
        value: ethers.parseEther("1"),

  });
//create org 
  it("should create an organization", async function () {
    const orgName = "Example Organization";
    const orgAbout = "This is an example organization";
    const orgGoalAmount = ethers.parseEther("100"); // 100 ETH in wei

    await donate.createOrganization(orgName, orgAbout, orgGoalAmount);

    const orgCount = await donate.getOrganiationsCount();
    expect(orgCount).to.equal(1);

    const org = await donate.getOrganization(0);
    expect(org.creator).to.equal(owner.address);
    expect(org.name).to.equal(orgName);
    expect(org.about).to.equal(orgAbout);
    expect(org.goalAmount).to.equal(orgGoalAmount);
    expect(org.currentAmount).to.equal(0); // Initial currentAmount should be zero
  });
// Beneficiary
    describe("Deployment", function () {
    it("Should set the right beneficiary", async function () {
   
      expect(await donationContract.currentBeneficiary()).to.equal(beneficiary1.address);
    });
// test active donation activity status from stopCampaign function

    it("should confirm withdrawal", async function () {
    const { donation, donor, beneficiary } await loadFixture (deployDonationFixture);  
        await donation. connect(donor).donate"test donation", { value: parseEther ("1.0") };
        (beneficiary).withdraw();
});
        describe("withdraw", function () {
    
    it("should not allow a non-beneficiary to withdraw the funds", async function () {
      await expect(donationContract.connect(donor1).withdrawFunds()).to.be.revertedWith("No funds to withdraw or not a beneficiary");
    })
            
            it('should emit a Withdrawal event when a beneficiary withdraws funds', async function () {
      await donationContract.connect(donor1).donate("first", { value: ethers.parseEther("1") });
      const withdrawalTransaction = donationContract.connect(beneficiary1).withdrawFunds();
      const timestamp = (await (await withdrawalTransaction).provider.getBlock('latest'))?.timestamp;

      await expect(withdrawalTransaction)
        .to.emit(donationContract, "FundsWithdrawn")
        .withArgs(beneficiary1.address, ethers.parseEther('1'),  timestamp );
    })
    
