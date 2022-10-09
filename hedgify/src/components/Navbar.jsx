import "../index.css";
import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
} from "../utils/wallet";
import { useEffect, useState } from "react";

import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev/');

let userAddress;
let balance;
export default function Navbar() {
  
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);
    userAddress = await wallet.slice(0,wallet.length);
    const usr_balance = await Tezos.tz.getBalance('tz1VFXp8YjNpBvdH9J9BT696Y3JG4ccqWJgf');
    balance = usr_balance.toNumber()/1000000;
    console.log('aaaaaa');
    console.log(balance);
    document.getElementById('bal').innerHTML = `Balance: ${balance}`
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
    document.getElementById('bal').innerHTML = `Balance: 0`
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
          Balance: 0
        </div>
        <div className='logo'>
          <img src='./src/tezlog.jpg'/>
          testyu
        </div>
    </nav>
  );
}
