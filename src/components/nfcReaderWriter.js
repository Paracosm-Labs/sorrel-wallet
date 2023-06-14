import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import BarLoader from "react-spinners/BarLoader";
import PuffLoader from "react-spinners/PuffLoader";
import OffcanvasPinpad from './offcanvasPinpad';

const NFCReaderWriter = ({ onNFCRead, publicAddress, encryptedPrivateKey, checksum }) => {
  const [message, setMessage] = useState('');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReader, setNfcReader] = useState(null);

  useEffect(() => {
    if ('NDEFReader' in window) {
      setNfcSupported(true);
      setNfcReader(new window.NDEFReader());
      
    }
  }, []);

  const readNFC = async () => {
    if (!nfcReader) {alert("NFC Reader is not available.")};
    setIsOffcanvasOpen(true);
    setMessage(`Please place card near to device and wait.`);

      try {
        await nfcReader.scan();
        
        nfcReader.onreading = ({ message, serialNumber }) => {
          const decoder = new TextDecoder();
          const data = decoder.decode(message.records[1].data);
          const parsedData = JSON.parse(data);
          const nfcEncryptedPrivateKey = parsedData.encryptedPrivateKey;
          const nfcChecksum = parsedData.checksum;
          const nfcPublicAddress = parsedData.publicAddress;
          setMessage(`Public address: ${nfcPublicAddress.base58}`);
          onNFCRead(parsedData);
          // alert(`${nfcPublicAddress.base58}`);
          // encryptedPrivateKey(nfcEncryptedPrivateKey);
          // checksum(nfcChecksum);
          setIsOffcanvasOpen(false);
          toast.success(`Card Successfully Read.`, {
            icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
            theme: 'dark',
          });
        };

      } catch (error) {
        setIsOffcanvasOpen(false);
        setMessage(`Failed to read. Please try again.: ${error}`);
        return;
        // alert(`${error}`);
      }


  };


  const writeNFC = async (data) => {
    setMessage('Please place card near to device and wait.');
    setIsOffcanvasOpen(true);
    try {
      const records = [
        { recordType: "url", data: "https://wallet.sorrelbanq.org" },
        {
          recordType: "text", 
          data: new TextEncoder().encode(JSON.stringify({
            publicAddress: data.publicAddress, 
            encryptedPrivateKey: data.encryptedPrivateKey,
            checksum: data.checksum
          }))
        },
        { recordType: "text", data: new TextEncoder().encode(JSON.stringify({dataSources: "data-sources-0x"})) },

      ];
      await nfcReader.write({ records });
      setMessage(`Card Successfully Activated.`);
      setIsOffcanvasOpen(false);
      setIsActivated(true);
      toast.success(`Your card is ready to use!`, {
        icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
        theme: 'dark',
      });
    } catch (error) {
      setMessage('Activation did not complete. Please try again.');
      setIsOffcanvasOpen(false);
      toast.error(`Please Try Again.`, {
        icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
        theme: 'dark',
      });
    }
  };


  const handleOffcanvasClose = () => {
    if (setIsOffcanvasOpen === true ) {
      setIsOffcanvasOpen(false);
    }
    
  };


    return (
      <>
      <div className="m-4 mb-5 text-white">
      
        {nfcSupported ? (
          <>
             <button className={`btn w-100 btn-lg mt-3 mb-3 btn-success ${isActivated ? ``: `d-none`}`}
               onClick={() => readNFC()}>Read Card</button> 
            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-success ${isActivated ? `btn-outline-success disabled`: ``}`}
              onClick={() => writeNFC({ publicAddress, encryptedPrivateKey, checksum })}
            >
              {isActivated ? (<>Activated&nbsp;&nbsp;<i className="fa-solid fa-circle-check"></i></>) : `Activate Card`}
            </button>
            <BarLoader className={`m-auto bg-primary ${isActivated ? `d-none` : `` }`} color="#109e77" size={120} />

        </>
        ) : (<>
          <button className="btn btn-outline-success w-100 btn-lg mt-3 mb-5 disabled">Activate Card</button>
          <p className="text-muted pb-5">NFC Reader is not available.<br/>Please use a NFC enabled device to activate.</p>
        </>)}
        {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}</p>}
      </div>
        

        <div className={`offcanvas nfc-reader offcanvas-top ${isOffcanvasOpen ? `show` :``}`}
        data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasActivation" aria-labelledby="offcanvasActivationLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-center m-auto" id="offcanvasActivationLabel">
            Tap Card to Scan
            </h5>

          </div>
          <div className="offcanvas-body mb-3">
            <div className="align-items-center mb-3">
              <PuffLoader className="m-auto" color="#109e77" size={120} />
            </div>
            <div className="align-items-center ">
              {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}<br/>{`${isActivated ? ``: `This may take up to 5 seconds to complete`}`}</p>}
            </div>
          </div>
        </div>
       

      </>
    );
  
};

export default NFCReaderWriter;
