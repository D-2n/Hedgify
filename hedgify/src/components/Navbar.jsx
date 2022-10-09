import "../index.css";
import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
} from "../utils/wallet";
import { useEffect, useState } from "react";

import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev/');
const Tezos1 = new TezosToolkit('https://mainnet.api.tez.ie')

let userAddress;
let balance;
let balance1;
let conn;
export default function Navbar() {
  
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
    userAddress = await wallet.slice(0,wallet.length);
    const usr_balance = await Tezos.tz.getBalance(wallet.slice(0,wallet.length));
    const usr_balance1 = await Tezos1.tz.getBalance(wallet.slice(0,wallet.length))
    balance = usr_balance.toNumber()/1000000;
    balance1 = usr_balance1.toNumber()/1000000;
    document.getElementById('bal').innerHTML = `Test: ${balance} Tez`;
    document.getElementById('bal1').innerHTML=`Main: ${balance1 } Tez`;
    document.getElementById('ind').style.display='none';
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
    document.getElementById('bal').innerHTML = `Test: 0 Tez`
    document.getElementById('bal1').innerHTML=`Main: 0 Tez`
    document.getElementById('ind').style.display='flex';
  };

  useEffect(() => {
    const func = async () => {
      const account = await getActiveAccount();
      if (account) {
        setWallet(account.address)
      }
    };
    func();
  }, []);


  return (
    <nav className="header">
        <button
          onClick={wallet ? handleDisconnectWallet : handleConnectWallet}
          className="walletlink">
          {" "}
          {wallet
            ? wallet.slice(0, 4) +
              "..." +
              wallet.slice(wallet.length - 4, wallet.length)
            : "Connect Wallet"}
        </button>
        <div id='bal' className='walletlink'>
          Test: 0 Tez
        </div>
        <div id='bal1' className='walletlink'>
          Main: 0 Tez
        </div>
        <div id='ind' class='walletlink'>Not connected!</div>
        <div className='logo'>
          <p>HEDGIFY</p>
          <img alt="oui" src='logo.png'/>
        </div>
    </nav>
  );
}
