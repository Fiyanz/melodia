// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MusicIPNFT is ERC721, Ownable {

    uint256 public tokenCounter;

    struct MusicIP {
        string title;
        string artist;
        string metadataURI;
        address creator;
        address royaltyContract;
        bool isActive;
    }

    struct Request {
        uint256 requestId;
        address creator;
        string title;
        string artist;
        string metadataURI;
        address royaltyContract;
        bool hasMinted;
    }

    mapping(uint256 => MusicIP) public musicIPs;
    mapping(uint256 => Request) public requests;
    uint256 public requestCounter;

    event MusicIPMinted(
        uint256 indexed tokenId,
        address indexed creator,
        address royaltyContract
    );

    event RequestSubmitted(uint256 indexed requestId, address indexed creator);
    event RequestApproved(uint256 indexed requestId, uint256 indexed tokenId);

    constructor() ERC721("Music IP NFT", "MIPNFT") Ownable(msg.sender) {
        tokenCounter = 0;
        requestCounter = 0;
    }

    // Called by CreatorHub (mock) or user
    function requestListing(
        string calldata _title,
        string calldata _artist,
        string calldata _metadataURI,
        address _royaltyContract
    ) external {
        requestCounter++;
        requests[requestCounter] = Request({
            requestId: requestCounter,
            creator: msg.sender,
            title: _title,
            artist: _artist,
            metadataURI: _metadataURI,
            royaltyContract: _royaltyContract,
            hasMinted: false
        });

        emit RequestSubmitted(requestCounter, msg.sender);
    }

    // Called by Admin to approve and mint
    function approveListing(uint256 _requestId) external onlyOwner {
        Request storage req = requests[_requestId];
        require(!req.hasMinted, "Already minted");
        require(req.creator != address(0), "Invalid request");

        uint256 tokenId = ++tokenCounter;
        _safeMint(req.creator, tokenId);

        musicIPs[tokenId] = MusicIP({
            title: req.title,
            artist: req.artist,
            metadataURI: req.metadataURI,
            creator: req.creator,
            royaltyContract: req.royaltyContract,
            isActive: true
        });

        req.hasMinted = true;
        emit MusicIPMinted(tokenId, req.creator, req.royaltyContract);
        emit RequestApproved(_requestId, tokenId);
    }

    function getPendingRequests() external view returns (Request[] memory) {
        uint256 pendingCount = 0;
        for (uint256 i = 1; i <= requestCounter; i++) {
            if (!requests[i].hasMinted) {
                pendingCount++;
            }
        }

        Request[] memory pending = new Request[](pendingCount);
        uint256 index = 0;
        for (uint256 i = 1; i <= requestCounter; i++) {
            if (!requests[i].hasMinted) {
                pending[index] = requests[i];
                index++;
            }
        }
        return pending;
    }

    // Old function kept for backward compatibility if needed, using modifier
    function mintMusicIP(
        address _creator,
        string calldata _title,
        string calldata _artist,
        string calldata _metadataURI,
        address _royaltyContract
    ) external onlyOwner returns (uint256) {
        tokenCounter++;
        uint256 tokenId = tokenCounter;
        _safeMint(_creator, tokenId);

        musicIPs[tokenId] = MusicIP({
            title: _title,
            artist: _artist,
            metadataURI: _metadataURI,
            creator: _creator,
            royaltyContract: _royaltyContract,
            isActive: true
        });

        emit MusicIPMinted(tokenId, _creator, _royaltyContract);
        return tokenId;
    }

    function getMusicIP(uint256 _tokenId)
        external
        view
        returns (MusicIP memory)
    {
        return musicIPs[_tokenId];
    }
}
