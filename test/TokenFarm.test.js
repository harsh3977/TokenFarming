const DaiToken = artifacts.require("DaiToken");
const JackToken = artifacts.require("JackToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(n) {
  return web3.utils.toWei(n, "ether");
}
contract("TokenFarm", ([owner, investor]) => {
  let daiToken, jackToken, tokenFarm;

  before(async () => {
    // Load Contracts
    daiToken = await DaiToken.new();
    jackToken = await JackToken.new();
    tokenFarm = await TokenFarm.new(jackToken.address, daiToken.address);

    // Transfer all Dapp tokens to farm (1 million)
    await jackToken.transfer(tokenFarm.address, tokens("1000000"));

    // Send tokens to investor
    await daiToken.transfer(investor, tokens("100"), { from: owner });
  });
});
