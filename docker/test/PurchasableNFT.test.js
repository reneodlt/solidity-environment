// SPDX-License-Identifier: MIT

const ExampleERC20 = artifacts.require('ExampleERC20');
const PurchasableNFT = artifacts.require('PurchasableNFT');
const BN = web3.utils.BN;
const chai = require('chai');
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);
const { expect } = chai;
const { expectRevert } = require('@openzeppelin/test-helpers');

contract('PurchasableNFT', ([deployer, buyer]) => {
    let exampleERC20;
    let purchasableNFT;

    beforeEach(async () => {
        exampleERC20 = await ExampleERC20.new("Example ERC 20","E20");
        purchasableNFT = await PurchasableNFT.new(exampleERC20.address);

        // Mint 100 tokens to buyer
        await exampleERC20.mint(buyer, web3.utils.toWei('100', 'ether'));
    });

    // Other tests...

    it('allows a user to purchase a new token with ExampleERC20 tokens', async () => {
        await exampleERC20.approve(purchasableNFT.address, web3.utils.toWei('10', 'ether'), { from: buyer });
        await purchasableNFT.purchaseNFT(buyer, { from: buyer });

        expect(await purchasableNFT.ownerOf(0)).to.equal(buyer);
        expect(await purchasableNFT.balanceOf(buyer)).to.be.a.bignumber.equal(new BN(1));
        expect(await exampleERC20.balanceOf(buyer)).to.be.a.bignumber.equal(web3.utils.toWei('90', 'ether'));
    });
});
