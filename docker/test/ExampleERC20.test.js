// SPDX-License-Identifier: MIT

const ExampleERC20 = artifacts.require('ExampleERC20');
const { expect } = require('chai');

contract('ExampleERC20', ([deployer, receiver]) => {
    let token;

    beforeEach(async () => {
        token = await ExampleERC20.new('Example ERC 20 Token', 'EXT'); // Supply specified here
    });

    it('has a name', async () => {
        expect(await token.name()).to.equal('Example ERC 20 Token');
    });

    it('has a symbol', async () => {
        expect(await token.symbol()).to.equal('EXT');
    });

    it('assigns the initial total supply to the deployer', async () => {
        const totalSupply = await token.totalSupply();
        const deployerBalance = await token.balanceOf(deployer);

        expect(totalSupply.toString()).to.equal('100000000000000000000');
        expect(deployerBalance.toString()).to.equal('100000000000000000000');
    });

    it('transfers tokens from sender to receiver', async () => {
        await token.transfer(receiver, 500, { from: deployer });

        const receiverBalance = await token.balanceOf(receiver);
        expect(receiverBalance.toString()).to.equal('500');
    });
});
