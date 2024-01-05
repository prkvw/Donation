//function purchaseProduct(uint256 _productId, uint _quantity, PayMethod _payMethod) public payable { }

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

  