// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { expect } from "chai";

describe (Point of sale)
let owner; any


describe ('Purchase products with ETH'), function(){
    before (async function ()(
        [owner, user1, user2] = await ethers.getSigners();


    )
};
it ('should add a product' async () => {
    cost productID = 1
    const price = 5
    const quantity = 
    const productTitle = 
    await pointOfSale.connect(owner).addProduct(ProductId,Price,ProductTitle,quantity, ..)

    const newProduct 

    const newProduct = await pointOfSale.products(productId)
    const newPorductQuantity = await 
})

it ('should purchase a product', async ()=> {
await expect.pointOfSale.connect(user1).purchaseProduct(1,3, (value: ethers.parseEther("15")))
to.emit(pointofSale, "Sale")
const contractAddr = await pointOfsale.getAddress()
const Inventory = 
const salesconst TotalSales = 
await expect(ethers.)

expect(inventory)to.equal("7")
expect(sales).to.equal('3')
expect(TotalSales).to.equal('15')

})

it ('should withdraw funds by the owner', async ()=> {
//
await expect (
    pointOfsale
)
})

it ('should not allow purchase with insufficient funds', async ()=> {
    //
    await expect (
        pointOfsale
    )
    })
    
