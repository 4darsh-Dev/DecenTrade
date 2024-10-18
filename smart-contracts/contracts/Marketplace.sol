// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Counters.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

/// @title DecentradeNFT
/// @notice This contract implements a custom NFT with royalty support
contract DecentradeNFT is ERC721URIStorage, ERC2981, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DecentradeNFT", "DNFT") Ownable(msg.sender) {}

    /// @notice Mint a new NFT
    /// @param recipient The address that will own the minted NFT
    /// @param tokenURI A URI pointing to the NFT's metadata
    /// @param royaltyFee The royalty fee for secondary sales (in basis points)
    /// @return The ID of the newly minted NFT
    function mintNFT(
        address recipient,
        string memory tokenURI,
        uint96 royaltyFee
    ) public whenNotPaused returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        _setTokenRoyalty(newItemId, recipient, royaltyFee);
        return newItemId;
    }

    /// @notice Pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }

    /// @notice EIP165 support
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

/// @title DecentradeMarketplace
/// @notice This contract implements a marketplace for trading NFTs
contract DecentradeMarketplace is ReentrancyGuard, Ownable, Pausable {
    using Counters for Counters.Counter;
    
    // State variables
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    uint256 public listingFee = 0.025 ether;
    address payable public marketplaceOwner;

    // Struct to represent a market item
    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    // Mappings
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => address[]) private tokenIdToOwnershipHistory;

    // Events
    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );

    constructor() Ownable(msg.sender) {
        marketplaceOwner = payable(msg.sender);
    }

    /// @notice Set the listing fee
    /// @param _listingFee The new listing fee
    function setListingFee(uint256 _listingFee) public onlyOwner {
        listingFee = _listingFee;
    }

    /// @notice Get the current listing fee
    /// @return The current listing fee
    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

    /// @notice Create a market item
    /// @param nftContract The address of the NFT contract
    /// @param tokenId The ID of the token to be listed
    /// @param price The price at which to list the NFT
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant whenNotPaused {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingFee, "Price must be equal to listing fee");

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    /// @notice Create a market sale
    /// @param nftContract The address of the NFT contract
    /// @param itemId The ID of the market item
    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant whenNotPaused {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(msg.value == price, "Please submit the asking price to complete the purchase");

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        idToMarketItem[itemId].sold = true;
        _itemsSold.increment();
        payable(marketplaceOwner).transfer(listingFee);

        tokenIdToOwnershipHistory[tokenId].push(msg.sender);

        emit MarketItemSold(
            itemId,
            nftContract,
            tokenId,
            idToMarketItem[itemId].seller,
            msg.sender,
            price
        );
    }

    /// @notice Fetch all unsold market items
    /// @return Array of unsold market items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = _itemIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0)) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice Fetch NFTs owned by the caller
    /// @return Array of market items owned by the caller
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice Fetch items created by the caller
    /// @return Array of market items created by the caller
    function fetchItemsCreated() public view returns (MarketItem[] memory) {
        uint256 totalItemCount = _itemIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /// @notice Get the ownership history of a token
    /// @param tokenId The ID of the token
    /// @return Array of addresses representing the ownership history
    function getOwnershipHistory(uint256 tokenId) public view returns (address[] memory) {
        return tokenIdToOwnershipHistory[tokenId];
    }

    /// @notice Pause the contract
    function pause() public onlyOwner {
        _pause();
    }

    /// @notice Unpause the contract
    function unpause() public onlyOwner {
        _unpause();
    }
}