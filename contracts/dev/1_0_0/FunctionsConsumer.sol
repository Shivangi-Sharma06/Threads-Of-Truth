// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

/**
 * @title Functions Consumer contract
 * @notice This contract is a sample contract to show how to make a Functions request
 */
abstract contract FunctionsConsumer is FunctionsClient, ConfirmedOwner {
    constructor(address router, bytes32 donId) FunctionsClient(router, donId) ConfirmedOwner(msg.sender) {}

    function _sendRequest(
        bytes memory request,
        uint64 subscriptionId,
        uint32 gasLimit
    ) internal returns (bytes32 requestId) {
        return sendRequest(request, subscriptionId, gasLimit);
    }
}
