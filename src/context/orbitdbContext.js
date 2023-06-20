import React, { createContext, useState, useEffect } from 'react';
import { create } from 'ipfs-http-client';
import OrbitDB from 'orbit-db';

export const OrbitDBContext = createContext();

export const OrbitDBProvider = ({ children }) => {
  const [orbitdb, setOrbitdb] = useState(null);

  // Create an instance of IPFS client
  const ipfs = create({ url: 'https://gateway.pinata.cloud:5001' });


  useEffect(() => {
    const init = async () => {
      const instance = await OrbitDB.createInstance(ipfs);
      setOrbitdb(instance);
    };
    if (!orbitdb) init();
  }, [orbitdb]);

  return (
    <OrbitDBContext.Provider value={{ orbitdb }}>
      {children}
    </OrbitDBContext.Provider>
  );
};
