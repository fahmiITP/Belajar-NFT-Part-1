var express = require("express");
var bodyParser = require("body-parser");
var abiEncoder = require("../services/encodeAbi");
var getContractBytecode = require("../services/getContractBytecode");
var getContractAbi = require("../services/getContractAbi");
const signature = require("../services/signature_verifier/signature_verifier");
const userRouter = require("./routes/users");
const contractRouter = require("./routes/contracts");
const tokenRouter = require("./routes/tokens");
var app = express();
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json({ limit: "200mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);

/* 
    Encode the parameters abi,
    Use it with query.
    Ex : /encode?contractName=Test&contractSymbol=TST
*/
app.get("/encode", (req, res) => {
  const contractName = req.query.contractName;
  const contractSymbol = req.query.contractSymbol;

  let result = abiEncoder(contractName, contractSymbol);
  let bytecode = getContractBytecode();

  res.send(bytecode + result);
});

// Get Contract ABI (Human Readable ABI)
app.get("/abi", (req, res) => {
  let result = getContractAbi();
  res.send(result);
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

// Users Routes
app.use("/users", userRouter);

// Contracts Route
app.use("/contracts", contractRouter);

// Contracts Route
app.use("/tokens", tokenRouter);

// Encode Message
app.post("/encodeMessage", (req, res) => {
  let hashedMessage = signature(
    req.body.sellerAddress,
    req.body.originalContractAddress,
    req.body.price,
    req.body.tradeMarketAddress,
    req.body.tokenId
  );

  res.send({ message: hashedMessage });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port " + (process.env.PORT || "3000"));
});
