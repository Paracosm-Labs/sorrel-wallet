import React, { createContext } from 'react';
import TronWeb from 'tronweb';

// Define the context
export const TronWebContext = createContext();

const TronWebContextProvider = ({ children }) => {
  const fullNode = 'https://api.nileex.io';
  const solidityNode = 'https://api.nileex.io';
  const eventServer = 'https://api.nileex.io';
  const bankDepository = 'TQoiUFedkHM2RiBNCbDCMBFwAf8HTX8qKc'; // Nile
  const privateKey = '0f';

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

  return (
    <TronWebContext.Provider value={{ tronWeb, bankDepository }}>
      {children}
    </TronWebContext.Provider>
  );
};

export default TronWebContextProvider;
