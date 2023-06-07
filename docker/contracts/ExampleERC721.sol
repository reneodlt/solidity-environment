// contracts/MyNFT.sol

pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleERC721 is ERC721, Ownable {
    uint256 public tokenId;

    constructor() ERC721("MyERC721", "MNFT") {
        tokenId = 0;
    }

    function mintNFT(address recipient) public onlyOwner {
        _mint(recipient, tokenId);
        tokenId++;
    }
}
