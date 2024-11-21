// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./Counters.sol";

/**
 * @title DecentradeNFT
 * @dev NFT contract with royalty support
 */
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

/**
 * @title DecentradeMarketplace
 * @dev Secure NFT marketplace with title management and advanced features
 */
contract DecentradeMarketplace is ReentrancyGuard, Ownable, Pausable {
    using Counters for Counters.Counter;
    using Address for address;
    
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;
    
    
    uint256 public listingFee;
    address payable public immutable marketplaceOwner;
    uint256 public constant MAX_LISTING_FEE = 0.1 ether;
    uint256 public constant MAX_PRICE = 1000 ether;
    
    
    struct MarketItem {
        uint256 itemId;
        string title;
        string description;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        uint256 listedTimestamp;
        bool isActive;
        string category;
    }
    
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => address[]) private tokenIdToOwnershipHistory;
    mapping(address => uint256) private sellerBalance;
    mapping(uint256 => bool) private validMarketItems;
    mapping(string => uint256[]) private categoryToItems;
    mapping(bytes32 => bool) private usedTitles;
    mapping(uint256 => uint256[]) private itemPriceHistory;
    
    event MarketItemCreated(
        uint256 indexed itemId,
        string title,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        string category,
        uint256 listedTimestamp
    );
    
    event MarketItemUpdated(
        uint256 indexed itemId,
        string newTitle,
        string newDescription,
        uint256 newPrice
    );
    
    event MarketItemSold(
        uint256 indexed itemId,
        string title,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price
    );
    
    event TitleChanged(
        uint256 indexed itemId,
        string oldTitle,
        string newTitle
    );

    event ItemDeactivated(uint256 indexed itemId, uint256 timestamp);
    event ItemReactivated(uint256 indexed itemId, uint256 timestamp);
    event ListingFeeUpdated(uint256 oldFee, uint256 newFee);
    event PriceHistoryUpdated(uint256 indexed itemId, uint256 newPrice);
    
    modifier validTitle(string memory title) {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(title).length <= 100, "Title too long");
        require(!usedTitles[keccak256(bytes(title))], "Title already in use");
        _;
    }
    
    modifier titleOwner(uint256 itemId) {
        require(idToMarketItem[itemId].seller == msg.sender, "Not the seller");
        _;
    }

    modifier validPrice(uint256 price) {
        require(price > 0, "Price must be greater than zero");
        require(price <= MAX_PRICE, "Price exceeds maximum allowed");
        _;
    }

    modifier validMarketItem(uint256 itemId) {
        require(validMarketItems[itemId], "Invalid market item");
        _;
    }
    
    constructor() Ownable(msg.sender) {
        marketplaceOwner = payable(msg.sender);
        listingFee = 0.025 ether;
    }
    
    /**
     * @dev Set the listing fee
     */
    function setListingFee(uint256 _listingFee) public onlyOwner {
        require(_listingFee <= MAX_LISTING_FEE, "Fee exceeds maximum allowed");
        uint256 oldFee = listingFee;
        listingFee = _listingFee;
        emit ListingFeeUpdated(oldFee, _listingFee);
    }

    /**
     * @dev Get the current listing fee
     */
    function getListingFee() public view returns (uint256) {
        return listingFee;
    }
    
    /**
     * @dev Create a new market item with title
     */
    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price,
        string memory title,
        string memory description,
        string memory category
    ) public payable nonReentrant whenNotPaused validPrice(price) validTitle(title) {
        require(nftContract.isContract(), "Invalid NFT contract address");
        require(msg.value == listingFee, "Incorrect listing fee");
        require(bytes(category).length > 0 && bytes(category).length <= 50, "Invalid category length");
        require(bytes(description).length <= 1000, "Description too long");
        
        _itemIds.increment();
        uint256 itemId = _itemIds.current();
        
        usedTitles[keccak256(bytes(title))] = true;
        
        idToMarketItem[itemId] = MarketItem(
            itemId,
            title,
            description,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            block.timestamp,
            true,
            category
        );
        
        validMarketItems[itemId] = true;
        categoryToItems[category].push(itemId);
        itemPriceHistory[itemId].push(price);
        
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        
        emit MarketItemCreated(
            itemId,
            title,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            category,
            block.timestamp
        );
    }
    
    /**
     * @dev Create a market sale
     */
    function createMarketSale(
        address nftContract,
        uint256 itemId
    ) public payable nonReentrant whenNotPaused validMarketItem(itemId) {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isActive, "Item not active");
        require(!item.sold, "Item already sold");
        require(msg.value == item.price, "Incorrect price");

        address seller = item.seller;
        uint256 tokenId = item.tokenId;
        uint256 price = item.price;

        item.owner = payable(msg.sender);
        item.sold = true;
        _itemsSold.increment();

        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        payable(seller).transfer(price);
        payable(marketplaceOwner).transfer(listingFee);

        tokenIdToOwnershipHistory[tokenId].push(msg.sender);
        
        emit MarketItemSold(
            itemId,
            item.title,
            nftContract,
            tokenId,
            seller,
            msg.sender,
            price
        );
    }
    
    /**
     * @dev Update market item details
     */
    function updateMarketItem(
        uint256 itemId,
        string memory newTitle,
        string memory newDescription,
        uint256 newPrice
    ) public nonReentrant titleOwner(itemId) validTitle(newTitle) validPrice(newPrice) validMarketItem(itemId) {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.sold, "Item already sold");
        require(item.isActive, "Item not active");
        require(bytes(newDescription).length <= 1000, "Description too long");
        
        usedTitles[keccak256(bytes(item.title))] = false;
        usedTitles[keccak256(bytes(newTitle))] = true;
        
        string memory oldTitle = item.title;
        item.title = newTitle;
        item.description = newDescription;
        item.price = newPrice;
        
        itemPriceHistory[itemId].push(newPrice);
        
        emit MarketItemUpdated(itemId, newTitle, newDescription, newPrice);
        emit TitleChanged(itemId, oldTitle, newTitle);
        emit PriceHistoryUpdated(itemId, newPrice);
    }
    
    /**
     * @dev Deactivate a market item
     */
    function deactivateMarketItem(uint256 itemId) 
        public nonReentrant titleOwner(itemId) validMarketItem(itemId) {
        MarketItem storage item = idToMarketItem[itemId];
        require(item.isActive, "Item already inactive");
        
        item.isActive = false;
        usedTitles[keccak256(bytes(item.title))] = false;
        
        emit ItemDeactivated(itemId, block.timestamp);
    }
    
    /**
     * @dev Reactivate a market item
     */
    function reactivateMarketItem(uint256 itemId, string memory newTitle) 
        public nonReentrant titleOwner(itemId) validTitle(newTitle) validMarketItem(itemId) {
        MarketItem storage item = idToMarketItem[itemId];
        require(!item.isActive, "Item already active");
        require(!item.sold, "Item already sold");
        
        item.isActive = true;
        string memory oldTitle = item.title;
        item.title = newTitle;
        usedTitles[keccak256(bytes(newTitle))] = true;
        
        emit TitleChanged(itemId, oldTitle, newTitle);
        emit ItemReactivated(itemId, block.timestamp);
    }

    /**
     * @dev Get price history for an item
     */
    function getPriceHistory(uint256 itemId) 
        public view validMarketItem(itemId) returns (uint256[] memory) {
        return itemPriceHistory[itemId];
    }
    
    /**
     * @dev Fetch all market items
     */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 itemCount = _itemIds.current();
        uint256 unsoldItemCount = itemCount - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(0) && 
                idToMarketItem[i + 1].isActive) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    /**
     * @dev Fetch items owned by msg.sender
     */
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

    /**
     * @dev Fetch items created by msg.sender
     */
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
    
        /**
     * @dev Search items by category (continued)
     */
    function fetchItemsByCategory(string memory category) 
        public view returns (MarketItem[] memory) {
        uint256[] storage itemIds = categoryToItems[category];
        MarketItem[] memory activeItems = new MarketItem[](itemIds.length);
        uint256 activeCount = 0;
        
        for (uint256 i = 0; i < itemIds.length; i++) {
            MarketItem storage item = idToMarketItem[itemIds[i]];
            if (item.isActive && !item.sold) {
                activeItems[activeCount] = item;
                activeCount++;
            }
        }

        // Create correctly sized array with only active items
        MarketItem[] memory result = new MarketItem[](activeCount);
        for (uint256 i = 0; i < activeCount; i++) {
            result[i] = activeItems[i];
        }
        
        return result;
    }
    
    /**
     * @dev Search items by title (partial match)
     */
    function searchByTitle(string memory searchTerm) 
        public view returns (MarketItem[] memory) {
        uint256 totalItems = _itemIds.current();
        uint256[] memory matchingIds = new uint256[](totalItems);
        uint256 matchCount = 0;
        
        for (uint256 i = 1; i <= totalItems; i++) {
            MarketItem storage item = idToMarketItem[i];
            if (item.isActive && !item.sold && 
                contains(toLowerCase(item.title), toLowerCase(searchTerm))) {
                matchingIds[matchCount] = i;
                matchCount++;
            }
        }
        
        MarketItem[] memory result = new MarketItem[](matchCount);
        for (uint256 i = 0; i < matchCount; i++) {
            result[i] = idToMarketItem[matchingIds[i]];
        }
        
        return result;
    }
    
    /**
     * @dev Helper function to check if a string contains a substring
     */
    function contains(string memory what, string memory where) 
        internal pure returns (bool) {
        bytes memory whatBytes = bytes(what);
        bytes memory whereBytes = bytes(where);
        
        if (whereBytes.length > whatBytes.length) {
            return false;
        }
        
        for (uint256 i = 0; i <= whatBytes.length - whereBytes.length; i++) {
            bool found = true;
            for (uint256 j = 0; j < whereBytes.length; j++) {
                if (whatBytes[i + j] != whereBytes[j]) {
                    found = false;
                    break;
                }
            }
            if (found) {
                return true;
            }
        }
        return false;
    }
    
    /**
     * @dev Helper function to convert string to lowercase
     */
    function toLowerCase(string memory str) 
        internal pure returns (string memory) {
        bytes memory bStr = bytes(str);
        bytes memory bLower = new bytes(bStr.length);
        
        for (uint256 i = 0; i < bStr.length; i++) {
            if ((uint8(bStr[i]) >= 65) && (uint8(bStr[i]) <= 90)) {
                bLower[i] = bytes1(uint8(bStr[i]) + 32);
            } else {
                bLower[i] = bStr[i];
            }
        }
        return string(bLower);
    }

    /**
     * @dev Get ownership history of a token
     */
    function getOwnershipHistory(uint256 tokenId) 
        public view returns (address[] memory) {
        return tokenIdToOwnershipHistory[tokenId];
    }
    
    /**
     * @dev Get item details by title
     */
    function getItemByTitle(string memory title) 
        public view returns (MarketItem memory) {
        uint256 totalItems = _itemIds.current();
        for (uint256 i = 1; i <= totalItems; i++) {
            MarketItem storage item = idToMarketItem[i];
            if (keccak256(bytes(item.title)) == keccak256(bytes(title))) {
                return item;
            }
        }
        revert("Item not found");
    }

    /**
     * @dev Batch list multiple items
     */
    function batchCreateMarketItems(
        address[] memory nftContracts,
        uint256[] memory tokenIds,
        uint256[] memory prices,
        string[] memory titles,
        string[] memory descriptions,
        string[] memory categories
    ) public payable nonReentrant whenNotPaused {
        require(
            nftContracts.length == tokenIds.length &&
            tokenIds.length == prices.length &&
            prices.length == titles.length &&
            titles.length == descriptions.length &&
            descriptions.length == categories.length,
            "Array lengths must match"
        );
        
        uint256 totalFee = listingFee * nftContracts.length;
        require(msg.value == totalFee, "Incorrect total listing fee");

        for (uint256 i = 0; i < nftContracts.length; i++) {
            createMarketItem(
                nftContracts[i],
                tokenIds[i],
                prices[i],
                titles[i],
                descriptions[i],
                categories[i]
            );
        }
    }

    /**
     * @dev Emergency withdrawal of stuck funds
     */
    function emergencyWithdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    /**
     * @dev Pause the contract
     */
    function pause() public onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause the contract
     */
    function unpause() public onlyOwner {
        _unpause();
    }

    /**
     * @dev Get total number of items ever created
     */
    function getTotalItems() public view returns (uint256) {
        return _itemIds.current();
    }

    /**
     * @dev Get total number of items sold
     */
    function getTotalItemsSold() public view returns (uint256) {
        return _itemsSold.current();
    }

    /**
     * @dev Get active item count
     */
    function getActiveItemCount() public view returns (uint256) {
        uint256 totalItems = _itemIds.current();
        uint256 activeCount = 0;
        
        for (uint256 i = 1; i <= totalItems; i++) {
            if (idToMarketItem[i].isActive && !idToMarketItem[i].sold) {
                activeCount++;
            }
        }
        
        return activeCount;
    }
}