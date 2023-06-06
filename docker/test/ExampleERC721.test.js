// test/MyNFT.test.js

const ExampleERC721 = artifacts.require('ExampleERC721');

const BN = web3.utils.BN;
const chai = require('chai');
const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const { expect } = require('chai');
const { expectRevert } = require('@openzeppelin/test-helpers');

contract('MyNFT', ([deployer, recipient]) => {
    let myNFT;

    beforeEach(async () => {
        myNFT = await ExampleERC721.new();
    });

    it('has correct name and symbol', async () => {
        expect(await myNFT.name()).to.equal('MyERC721');
        expect(await myNFT.symbol()).to.equal('MNFT');
    });

    it('mints a new token', async () => {
        await myNFT.mintNFT(recipient, { from: deployer });

        expect(await myNFT.ownerOf(0)).to.equal(recipient);
        expect(await myNFT.balanceOf(recipient)).to.be.bignumber.equal('1');
    });

    it('only owner can mint tokens', async () => {
        await expectRevert(
            myNFT.mintNFT(recipient, { from: recipient }),
            'Ownable: caller is not the owner',
        );
    });
});
