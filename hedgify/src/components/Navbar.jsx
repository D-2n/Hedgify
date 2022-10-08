import "../index.css";
import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
} from "../utils/wallet";
import { useEffect, useState } from "react";

import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev/');


export default function Navbar() {
  var balanceze = 0
  
  const [wallet, setWallet] = useState(null);

  const handleConnectWallet = async () => {
    const { wallet } = await connectWallet();
    setWallet(wallet);

    Tezos.tz
      .getBalance(wallet.slice(0,wallet.length))
      .then((balance) => {
        balanceze = balance.c[0]
        console.log(balanceze)
      })
  };
  const handleDisconnectWallet = async () => {
    const { wallet } = await disconnectWallet();
    setWallet(wallet);
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
        <div className='walletlink'>
        {wallet ? balanceze : "Balance: $0.0"}
        </div>
        <div className='logo'>
          <img src="photo.png" alt=''></img>
          testyu
        </div>
    </nav>
  );
}
