import React, { createContext,useState } from 'react';
import TronWeb from 'tronweb';

// Define the context
export const TronWebContext = createContext();

const TronWebContextProvider = ({ children }) => {
  const fullNode = 'https://api.nileex.io';
  const solidityNode = 'https://api.nileex.io';
  const eventServer = 'https://api.nileex.io';

  //Nile
  const bankDepository = 'TQoiUFedkHM2RiBNCbDCMBFwAf8HTX8qKc'; // Nile
  const demoSorrelMember = 'TULEMBAZwHsTK5JSfyF1cZAMTVsoknCPnp'; // Nile
  const demoKey = process.env.REACT_APP_DEMO_PRIVATE_KEY; // Nile


  //Mainnet
  // const bankDepository = 'TNYsTzEyH5Jr2BuagKhfTCTjeaLRaRu1Av';


  const privateKey = '0f';
  const [transactionCompleted, setTransactionCompleted] = useState(false);

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);


  return (
    <TronWebContext.Provider value={{ tronWeb, bankDepository, transactionCompleted, setTransactionCompleted, demoKey, demoSorrelMember }}>
      {children}
    </TronWebContext.Provider>
  );
};

export default TronWebContextProvider;
