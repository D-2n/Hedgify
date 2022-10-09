import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import config from "../config";

const preferredNetwork = "mainnet";
const options = {
  name: "HEDGIFY",
  iconUrl: "https://tezostaquito.io/img/favicon.png",
  preferredNetwork: preferredNetwork,
};
const rpcURL = "https://uoi3x99n7c.tezosrpc.midl.dev";
const wallet = new BeaconWallet(options);

const getActiveAccount = async () => {
  return await wallet.client.getActiveAccount();
};

const connectWallet = async () => {
  let account = await wallet.client.getActiveAccount();

  if (!account) {
    await wallet.requestPermissions({
      network: { type: preferredNetwork },
    });
    account = await wallet.client.getActiveAccount();
  }
  return { success: true, wallet: account.address };
};

const disconnectWallet = async () => {
  await wallet.disconnect();
  return { success: true, wallet: null };
};

const checkIfWalletConnected = async (wallet) => {
  try {
    const activeAccount = await wallet.client.getActiveAccount();
    if (!activeAccount) {
      await wallet.client.requestPermissions({
        type: { network: preferredNetwork },
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};


export const getValue = async () => {
  // const wallet = new BeaconWallet(options);
  const response = await checkIfWalletConnected(wallet);
  if (response.success) {

    const token1 = 2;
    const token2 = 3; // or new BigNumber(0) or "0"
    const amount = 2300000000000000000; // or new BigNumber(10_000_000) or "10000000"
    const minReceived = 1
    const tezos = new TezosToolkit(rpcURL);
    tezos.setWalletProvider(wallet);
    const yupana = await tezos.contract.at(config.yTokenAddress);
    const kUSd = await tezos.contract.at(config.kUSDToken);
    const proxy = await tezos.contract.at(config.PriceFeedProxyAddress);
    const batchArray = [
      {
        kind: "transaction",
        ...kUSd.methods.approve(config.yTokenAddress, amount).toTransferParams(),
      },
      {
        kind: "transaction",
        ...proxy.methods.getPrice([token1, token2]).toTransferParams(),
      },
      {
        kind: "transaction",
        ...yupana.methods.updateInterest(token2).toTransferParams(),
      },
      {
        kind: "transaction",
        ...yupana.methods.mint(token1, amount, minReceived).toTransferParams(),
      },
      ];
    const batch = await tezos.wallet.batch(batchArray);
    const operation = await batch.send();

    const result = await operation.confirmation();
    console.log(result);
  }
};

export {
  connectWallet,
  disconnectWallet,
  getActiveAccount,
  checkIfWalletConnected,
};