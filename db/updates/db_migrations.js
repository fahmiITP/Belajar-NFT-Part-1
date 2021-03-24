const addTokenSaleColumn = require("./1_add_token_sale_columns");

(async function () {
  // Add Token Sale columns
  const addTokenSale = await addTokenSaleColumn.addTokenSaleColumn();
  console.log(addTokenSale);

  // Exit The Console
  process.exit();
})();
