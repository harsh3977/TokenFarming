const DaiToken = artifacts.require("DaiToken");
const JackToken = artifacts.require("JackToken");
const TokenFarm = artifacts.require("TokenFarm");
module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  await deployer.deploy(JackToken);
  const jackToken = await JackToken.deployed();

  await deployer.deploy(TokenFarm, jackToken.address, daiToken.address);
  const tokenFarm = await TokenFarm.deployed();

  // Transfer all tokens to TokenFarm (1 million)
  await jackToken.transfer(tokenFarm.address, "1000000000000000000000000");

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.transfer(accounts[1], "100000000000000000000");
};
