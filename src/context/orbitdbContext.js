// OrbitDBContext.js
import React, { createContext, useState, useEffect } from 'react';
import IPFS from 'ipfs-core';
import OrbitDB from 'orbit-db';

export const OrbitDBContext = createContext();

export const OrbitDBProvider = ({ children }) => {
  const [orbitdb, setOrbitdb] = useState(null);
  const [ipfs, setIpfs] = useState(null);

  useEffect(() => {
    const init = async () => {
      const ipfsOptions = { EXPERIMENTAL: { pubsub: true } };
      const ipfs = await IPFS.create(ipfsOptions);
      const orbitdb = await OrbitDB.createInstance(ipfs);
      setOrbitdb(orbitdb);
      setIpfs(ipfs);
    };
    init();
  }, []);

  return (
    <OrbitDBContext.Provider value={{ orbitdb, ipfs }}>
      {children}
    </OrbitDBContext.Provider>
  );
};
