var SimpleStorage = artifacts.require('SimpleStorage');
var ExampleERC20 = artifacts.require('ExampleERC20');
var ExampleERC721 = artifacts.require('ExampleERC721');
module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);
    deployer.deploy(ExampleERC20, "Example ERC 20 Token", "EXT");
    deployer.deploy(ExampleERC721);
};