const path = require("path");
const fs = require("fs");
const solc = require("solc");

module.exports = function () {
  // Find the path of UserContract.sol inside the folder 'contract' in the project
  const ContractPath = path.resolve(
    __dirname,
    "../../contracts",
    "TradeMarketV2Flattened.sol"
  );
  const Contract = fs.readFileSync(ContractPath, "utf8");

  // Create Solc input
  let input = {
    language: "Solidity",
    sources: {
      "TradeMarketV2Flattened.sol": {
        content: Contract,
      },
    },
    settings: {
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  // Compile the contracts
  let output = JSON.parse(solc.compile(JSON.stringify(input)));
  return output;
};
