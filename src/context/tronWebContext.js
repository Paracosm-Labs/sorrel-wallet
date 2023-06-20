import React, { createContext,useState } from 'react';
import TronWeb from 'tronweb';

// Define the context
export const TronWebContext = createContext();

const TronWebContextProvider = ({ children }) => {
  const fullNode = 'https://api.nileex.io';
  const solidityNode = 'https://api.nileex.io';
  const eventServer = 'https://api.nileex.io';

  //Nile
	const bankDepository = 'TQoiUFedkHM2RiBNCbDCMBFwAf8HTX8qKc';
	const gStableManager = 'TZDofabgTUK43589ow9zD3LseNPmVYqk6g';
	const TransferComptroller = "TGWs2QiZsoi4B1muRepSgEzJjQHiZjHEY9";
	const ConvertComptroller = "TFuXJa7Hk47ny5Xa5W6ePRoK6GdXMcateh";
	const demoSorrelMember = 'TULEMBAZwHsTK5JSfyF1cZAMTVsoknCPnp';
	const demoKey = process.env.REACT_APP_DEMO_PRIVATE_KEY; // Nile DO NOT USE on Mainnet


  //Mainnet
	// const bankDepository = 'TNYsTzEyH5Jr2BuagKhfTCTjeaLRaRu1Av';
	// const gStableManager = 'TFNqfwJtaimUAYk79Lsru6L7JWMss4Fboq';
	// const TransferComptroller = "TXiA4QfUEuJ8tYr8ZaM3jHJ6odijNnJoZw";
	// const ConvertComptroller = "TAcuSa6AnWqc74PpowBqUaaJN4ZSo6WXHM";



  const privateKey = '0f';
  const [transactionCompleted, setTransactionCompleted] = useState(false);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


  return (
    <TronWebContext.Provider value={{ 
    	tronWeb, 
    	bankDepository,
    	gStableManager, 
    	transactionCompleted, 
    	setTransactionCompleted, 
    	demoSorrelMember,
    	demoKey 
     }}>
      {children}
    </TronWebContext.Provider>
  );
};

export default TronWebContextProvider;
