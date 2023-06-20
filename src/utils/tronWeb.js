// import React, { useState, useEffect } from 'react';
// import TronWeb from 'tronweb';

// const TronWebConnect = () => {
//   const [tronWeb, setTronWeb] = useState(null);

//   useEffect(() => {
//     const HttpProvider = TronWeb.providers.HttpProvider;
//     const fullNode = new HttpProvider('https://api.nileex.io');
//     const solidityNode = new HttpProvider('https://api.nileex.io');
//     const eventServer = 'https://api.nileex.io';


//     const privateKey = '0f';

//     const tronWebInstance = new TronWeb(
//       fullNode,
//       solidityNode,
//       eventServer,
//       privateKey
//     );

//     setTronWeb(tronWebInstance);
//   }, []);
  

//   };


// export default TronWebConnect;
