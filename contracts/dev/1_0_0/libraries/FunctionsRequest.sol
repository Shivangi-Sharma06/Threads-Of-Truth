// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library FunctionsRequest {
    enum Location { Inline }
    enum CodeLanguage { JavaScript }

    struct Request {
        Location location;
        CodeLanguage language;
        string source;
        bytes secrets;
        bytes[] args;
    }

    function initializeRequest(
        Request memory self,
        Location location,
        CodeLanguage language,
        string memory source
    ) internal pure {
        self.location = location;
        self.language = language;
        self.source = source;
    }

    function addInlineSecrets(Request memory self, bytes memory secrets) internal pure {
        self.secrets = secrets;
    }

    function setArgs(Request memory self, bytes[] memory args) internal pure {
        self.args = args;
    }

    function encodeCBOR(Request memory self) internal pure returns (bytes memory) {
        return abi.encode(self.location, self.language, self.source, self.secrets, self.args);
    }
}
