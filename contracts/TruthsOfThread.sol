// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./dev/1_0_0/FunctionsConsumer.sol";
import {FunctionsRequest} from "./dev/1_0_0/libraries/FunctionsRequest.sol";

using FunctionsRequest for FunctionsRequest.Request;

contract ThreadsOfTruth is FunctionsConsumer {
    enum Role { Artisan, Verifier, Admin }
    enum Status { PENDING, VALID, INVALID }

    struct Metadata {
        string productName;
        string productId;
        string location;
        string imageHash;
        uint256 timestamp;
        Role role;
        Status status;
    }

    mapping(address => Metadata) public submissions;

    event VerificationRequested(address indexed user, string productId);
    event VerificationCompleted(address indexed user, string productId, Status status);

    constructor(address router, bytes32 _donId) FunctionsConsumer(router, _donId) {}

    function submitMetadata(
        string memory productName,
        string memory productId,
        string memory location,
        string memory imageHash,
        uint256 timestamp,
        Role role
    ) external {
        require(bytes(productId).length > 0, "Product ID required");
        require(bytes(location).length > 0, "Location required");
        require(timestamp <= block.timestamp + 60, "Timestamp too far in future");
        require(timestamp >= block.timestamp - 300, "Timestamp too old");

        submissions[msg.sender] = Metadata({
            productName: productName,
            productId: productId,
            location: location,
            imageHash: imageHash,
            timestamp: timestamp,
            role: role,
            status: Status.PENDING
        });

        emit VerificationRequested(msg.sender, productId);
    }

    function fulfillRequest(
        // bytes32 requestId,
        bytes memory response
        // bytes memory err
    ) internal {
        address caller = msg.sender;

        Status status;
        if (keccak256(response) == keccak256(bytes("VALID"))) {
            status = Status.VALID;
        } else {
            status = Status.INVALID;
        }

        submissions[caller].status = status;
        emit VerificationCompleted(caller, submissions[caller].productId, status);
    }

    function getRoleString(address user) public view returns (string memory) {
        Role role = submissions[user].role;
        if (role == Role.Artisan) return "Artisan";
        if (role == Role.Verifier) return "Verifier";
        if (role == Role.Admin) return "Admin";
        return "Unknown";
    }

    function getVerificationStatus(address user) external view returns (string memory) {
        Status status = submissions[user].status;
        if (status == Status.PENDING) return "PENDING";
        if (status == Status.VALID) return "VALID";
        if (status == Status.INVALID) return "INVALID";
        return "UNKNOWN";
    }

    function sendRequest(
    string calldata source,
    bytes calldata secrets,
    bytes[] calldata args,
    uint64 subscriptionId,
    uint32 gasLimit
) external returns (bytes32 requestId) {
    FunctionsRequest.Request memory req;
    req.initializeRequest(FunctionsRequest.Location.Inline, FunctionsRequest.CodeLanguage.JavaScript, source);


    if (secrets.length > 0) {
        req.addInlineSecrets(secrets);
    }

    if (args.length > 0) {
        req.setArgs(args);
    }

    requestId = _sendRequest(req.encodeCBOR(), subscriptionId, gasLimit);
}

}
