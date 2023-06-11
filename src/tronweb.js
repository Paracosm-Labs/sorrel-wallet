const { PRIVATE_KEY, TRON_PRO_API_KEY } = require('./config');
const TronWeb = require("tronweb");

const
// https://developers.tron.network/reference/tronweb-object
const tronWeb = new TronWeb({
  fullNode: "https://api.nileex.io/",
  solidityNode: "https://api.nileex.io/",
  eventServer: "https://api.nileex.io/",
  // fullHost: "https://api.trongrid.io/",
  headers: { "TRON-PRO-API-KEY": TRON_PRO_API_KEY },
  privateKey: PRIVATE_KEY,


});

module.exports = { tronWeb };