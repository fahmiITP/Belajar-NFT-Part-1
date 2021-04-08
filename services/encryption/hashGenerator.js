const CryptoJS = require("crypto-js");

module.exports = function (plainText) {
  /// Secret Key
  const rawkey = "ITP-Blockchain-Demo";
  /// Encrypt using AES
  var ciphertext = CryptoJS.AES.encrypt(plainText, rawkey).toString();
  return ciphertext;
};
