var SimpleStorage = artifacts.require('SimpleStorage');
var ExampleERC20 = artifacts.require('ExampleERC20');
var ExampleERC721 = artifacts.require('ExampleERC721');
var PurchasableNFT = artifacts.require('PurchasableNFT');
// module.exports = function (deployer) {
//     deployer.deploy(SimpleStorage);
//     deployer.deploy(ExampleERC20, "Example ERC 20 Token", "EXT");
//     deployer.deploy(ExampleERC721);
//     deployer.deploy(PurchasableNFT, ExampleERC20);
// };

module.exports = function (deployer) {
    deployer.deploy(SimpleStorage);

    deployer.deploy(ExampleERC20, "Example ERC 20 Token", "EXT").then(function() {
        return deployer.deploy(ExampleERC721);
    }).then(function() {
        return deployer.deploy(PurchasableNFT, ExampleERC20.address);
    });
};