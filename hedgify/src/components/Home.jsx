import "../index.css";
import { config } from '../config'

import { TezosToolkit } from '@taquito/taquito';
const Tezos = new TezosToolkit('https://ghostnet.tezos.marigold.dev/');

export default function Home() {

  const { contractAddress } = config

  async function asyncCall() {
    const contract = await Tezos.contract.at(contractAddress);
    console.log(contract);
    const parameters = [ { "kind": "transaction", "source": "tz1VFXp8YjNpBvdH9J9BT696Y3JG4ccqWJgf", "fee": "1553", "counter": "12135538", "gas_limit": "12100", "storage_limit": "894", "amount": "10000000", "destination": "KT1T7Rx3uzj5wwvFVrCnHxo64RvFtS8awJK7", "parameters": { "entrypoint": "create_vault", "value": { "prim": "Pair", "args": [ { "prim": "True" }, { "prim": "Pair", "args": [ { "prim": "Some", "args": [ { "string": "tz1Zt8QQ9aBznYNk5LUBjtME9DuExomw9YRs" } ] }, { "string": "KT1HDUeKqTvmvFXTyz9Hei3HMhjdmETiQNmx%set_address" } ] } ] } } }, { "kind": "transaction", "source": "tz1VFXp8YjNpBvdH9J9BT696Y3JG4ccqWJgf", "fee": "3598", "counter": "12135539", "gas_limit": "32546", "storage_limit": "157", "amount": "0", "destination": "KT1T7Rx3uzj5wwvFVrCnHxo64RvFtS8awJK7", "parameters": { "entrypoint": "mint", "value": { "int": "1000000000000" } } } ]
    const op = await contract.methods.create_vault(parameters).send();
    console.log(op);
    await op.confirmation()
    console.log("confirmed!")
  }

  return (
    <div>
      <div>
      <button onClick={asyncCall}>Default</button>;
      </div>
    </div>
  );
}
