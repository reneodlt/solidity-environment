// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { ExampleERC20 } from "./ExampleERC20.sol";


contract PurchasableNFT is ERC721, Ownable {
    uint256 public tokenId;
    ExampleERC20 public erc20Contract; // The ERC20 token contract
    uint256 public tokenPrice;

    constructor(ExampleERC20 _erc20Contract) ERC721("PurchasableNFT", "PNFT") {
        tokenId = 0;
        erc20Contract = _erc20Contract;
        tokenPrice = 10 * 10 ** uint(erc20Contract.decimals()); // Setting token price as 10 tokens
    }

    function purchaseNFT(address recipient) public {
        require(erc20Contract.balanceOf(msg.sender) >= tokenPrice, "Not enough tkns to purchase NFT"); // Keep message to < 32 chars to avoid excess gas fees and lint warning.

        // Transfer tokens to contract owner
        erc20Contract.transferFrom(msg.sender, owner(), tokenPrice);

        // Mint NFT to recipient
        _mint(recipient, tokenId);
        tokenId++;
    }
}