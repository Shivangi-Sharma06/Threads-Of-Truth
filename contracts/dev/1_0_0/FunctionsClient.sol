// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

abstract contract FunctionsClient {
    address public i_router;
    bytes32 public i_donId;

    constructor(address router, bytes32 donId) {
        i_router = router;
        i_donId = donId;
    }

    // Add dummy implementation to avoid abstract contract
    function sendRequest(bytes memory, uint64, uint32) internal pure virtual returns (bytes32) {
        return keccak256("dummy-request");
    }
}
