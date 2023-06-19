import React, { createContext } from 'react';
import TronWeb from 'tronweb';

// Define the context
export const TronWebContext = createContext();

// Define the provider component
export const TronWebProvider = ({ children }) => {
  const fullNode = 'https://api.nileex.io';
  const solidityNode = 'https://api.nileex.io';
  const eventServer = 'https://api.nileex.io';
  const bankDepository = 'TQoiUFedkHM2RiBNCbDCMBFwAf8HTX8qKc'; // Nile

  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer);

  return (
    <TronWebContext.Provider value={{ tronWeb, bankDepository }}>
      {children}
    </TronWebContext.Provider>
  );
};
