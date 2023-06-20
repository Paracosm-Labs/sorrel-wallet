import React, { createContext, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import OrbitDB from 'orbit-db';

export const OrbitDBContext = createContext();

export const OrbitDBProvider = ({ children }) => {
  const [databases, setDatabases] = useState({});

  // Create an instance of IPFS client
  const ipfs = create({ url: 'https://gateway.ipfs.io:5001' });

  useEffect(() => {
    const init = async () => {
      const instance = await OrbitDB.createInstance(ipfs);
      const db1 = await instance.create('transaction_history', 'docstore', {
        indexBy: 'txHash',
      });
      await db1.load();

      const db2 = await instance.create('address_book', 'docstore', {
        indexBy: 'id',
      });
      await db2.load();

      setDatabases({ transaction_history: db1, address_book: db2 });
    };
    if (Object.keys(databases).length === 0) init();
  }, [databases, ipfs]);

  return (
    <OrbitDBContext.Provider value={{ databases }}>
      {children}
    </OrbitDBContext.Provider>
  );
};

