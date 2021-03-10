var express = require("express");
var abiEncoder = require('../services/encodeAbi');
var getContractBytecode = require('../services/getContractBytecode');
var getContractAbi = require('../services/getContractAbi');
var app = express();
var cors = require('cors');

app.use(cors());

/* 
    Encode the parameters abi,
    Use it with query.
    Ex : /encode?contractName=Test&contractSymbol=TST
*/
app.get("/encode", (req, res) => {
    const contractName = req.query.contractName;
    const contractSymbol = req.query.contractSymbol;

    let result = abiEncoder(contractName, contractSymbol);
    res.send(result);
});

// Get current compiled contract bytecode
app.get("/bytecode", (req, res) => {
    let result = getContractBytecode();
    res.send(result);
});

// Get Contract ABI (Human Readable ABI)
app.get("/abi", (req, res) => {
    let result = getContractAbi();
    res.send(result);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});