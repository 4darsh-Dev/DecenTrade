// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./Counters.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract DecentradeNFT is ERC721URIStorage, ERC2981, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("DecentradeNFT", "DNFT") Ownable(msg.sender) {}

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

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

contract DecentradeMarketplace is ReentrancyGuard, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    uint256 public listingFee = 0.025 ether;
    address payable public marketplaceOwner;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => address[]) private tokenIdToOwnershipHistory;

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

    function setListingFee(uint256 _listingFee) public onlyOwner {
        listingFee = _listingFee;
    }

    function getListingFee() public view returns (uint256) {
        return listingFee;
    }

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

    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant whenNotPaused {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );

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

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    MarketItem[] memory items = new MarketItem[](totalItemCount);

    for (uint256 i = 0; i < totalItemCount; i++) {
        MarketItem storage currentItem = idToMarketItem[i + 1];
        if (currentItem.owner == msg.sender) {
            items[itemCount] = currentItem;
            itemCount += 1;
        }
    }

    // Resize the array to match the actual number of items
    MarketItem[] memory userItems = new MarketItem[](itemCount);
    for (uint256 i = 0; i < itemCount; i++) {
        userItems[i] = items[i];
    }

    return userItems;
}


    function fetchItemsCreated() public view returns (MarketItem[] memory) {
    uint256 totalItemCount = _itemIds.current();
    uint256 itemCount = 0;
    MarketItem[] memory items = new MarketItem[](totalItemCount);

    for (uint256 i = 0; i < totalItemCount; i++) {
        MarketItem storage currentItem = idToMarketItem[i + 1];
        if (currentItem.seller == msg.sender) {
            items[itemCount] = currentItem;
            itemCount += 1;
        }
    }

    // Resize the array to match the actual number of items
    MarketItem[] memory userItems = new MarketItem[](itemCount);
    for (uint256 i = 0; i < itemCount; i++) {
        userItems[i] = items[i];
    }

    return userItems;
}


    function getOwnershipHistory(
        uint256 tokenId
    ) public view returns (address[] memory) {
        return tokenIdToOwnershipHistory[tokenId];
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
