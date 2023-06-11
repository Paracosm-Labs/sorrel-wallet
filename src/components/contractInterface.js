import React, { useState, useEffect } from 'react';
import TronWeb from 'tronweb';

const ContractInterface = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [balance, setBalance] = useState(null);
  const [depositId, setDepositId] = useState('');
  const [depositTokens, setDepositTokens] = useState('');
  const [withdrawId, setWithdrawId] = useState('');
  const [withdrawTokens, setWithdrawTokens] = useState('');

  const contractAddress = 'TNYsTzEyH5Jr2BuagKhfTCTjeaLRaRu1Av';

  useEffect(() => {
    const HttpProvider = TronWeb.providers.HttpProvider;
    const fullNode = new HttpProvider('https://api.nileex.io');
    const solidityNode = new HttpProvider('https://api.nileex.io');
    const eventServer = 'https://api.nileex.io';


    const privateKey = '0f';

    const tronWebInstance = new TronWeb(
      fullNode,
      solidityNode,
      eventServer,
      privateKey
    );

    setTronWeb(tronWebInstance);
  }, []);

  const handleDeposit = async () => {
    const contract = await tronWeb.contract().at(contractAddress);
    const result = await contract.deposit(depositId, depositTokens).send();
    console.log(result);
  };

  const handleWithdraw = async () => {
    const contract = await tronWeb.contract().at(contractAddress);
    const result = await contract.withdraw(withdrawId, withdrawTokens).send();
    console.log(result);
  };



  useEffect(() => {
    const fetchBalance = async () => {
      const contract = await tronWeb.contract().at(contractAddress);
      const balance = await contract.gStableBalanceMap(1,'TCiJCtTBhGSw8mMYYts67vCXUjdoFLLuYw').call();
      setBalance(balance.toString());
    };

    if (tronWeb) {
      fetchBalance();
    }
  }, [tronWeb]);


  if (!tronWeb) {
    return <div className="text-white">Loading...</div>;
  };

  return (
      <>
      <div className="text-white">
      <h2 >Balance</h2>
      {balance ? <p>Your balance: {balance}</p> : <p>Loading balance...</p>}
    </div>
    <div>
      <h2>Deposit</h2>
      <input type="text" value={depositId} onChange={e => setDepositId(e.target.value)} placeholder="ID" />
      <input type="text" value={depositTokens} onChange={e => setDepositTokens(e.target.value)} placeholder="Tokens" />
      <button onClick={handleDeposit}>Deposit</button>

      <h2>Withdraw</h2>
      <input type="text" value={withdrawId} onChange={e => setWithdrawId(e.target.value)} placeholder="ID" />
      <input type="text" value={withdrawTokens} onChange={e => setWithdrawTokens(e.target.value)} placeholder="Tokens" />
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
    </>
  );
};

export default ContractInterface;
