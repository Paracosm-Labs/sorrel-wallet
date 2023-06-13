import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import PuffLoader from "react-spinners/PuffLoader";

const NFCReaderWriter = ({ publicAddress, privateKey, checksum, data01, data02 }) => {
  const [message, setMessage] = useState('');
  const [nfcAvailable, setNfcAvailable] = useState('NDEFReader' in window);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(true);
  const [isActivated, setIsActivated] = useState(false);
  const offcanvasElement = useRef(); // Create a ref for the offcanvas
  let reader;

  useEffect(() => {
    if (nfcAvailable) {
      reader = new window.NDEFReader();
    }
  }, [nfcAvailable]);

  const readNFC = async () => {
    try {
      await reader.scan();
      reader.onreading = ({ message, serialNumber }) => {
        const decoder = new TextDecoder();
        const data = decoder.decode(message.records[0].data);
        const parsedData = JSON.parse(data);
        const addr = parsedData.publicAddress;
        setMessage(`Public address: ${addr}`);
      };
    } catch (error) {
      setMessage(`Error: ${error}`);
    }
  };

  const writeNFC = async (data) => {
    setMessage('Please place card near to your device and wait.');
    setIsOffcanvasOpen(true);
    try {
      const records = [
        { recordType: "text", data: new TextEncoder().encode(data.publicAddress) },
        { recordType: "text", data: new TextEncoder().encode(data.privateKey) },
        { recordType: "text", data: new TextEncoder().encode(data.checksum) },
        { recordType: "text", data: new TextEncoder().encode(data.data01) },
        { recordType: "text", data: new TextEncoder().encode(data.data02) },
      ];
      await reader.write({ records });
      setMessage('Card Successfully Activated.');
      setIsOffcanvasOpen(false);
      setIsActivated(true);
      toast.success(`Card Successfully Activated.`, {
        icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
        theme: 'dark',
      });
    } catch (error) {
      setIsOffcanvasOpen(false);
      toast.error(`${error}`, {
        icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
        theme: 'dark',
      });
    }
  };

    return (
      <>
      <div className="m-4 mb-5 text-white">
      
        {nfcAvailable ? (
          <>
            {/* <button className="btn btn-outline-success w-100 btn-lg mt-3" onClick={this.readNFC}>Read Card</button> -- */}
           
            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-outline-success ${isActivated ? `disabled`: ``}`}
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasActivation"
              aria-controls="offcanvasActivation"
              onClick={() => writeNFC({ publicAddress, privateKey, checksum, data01, data02 })}
            >{isActivated ? `Card Activated` : `Activate Card`}</button>


        </>
        ) : (<>
          <button className="btn btn-outline-success w-100 btn-lg mt-3 mb-5 disabled">Activate Card</button>
          <p className="text-muted pb-5">NFC Reader is not available.<br/>Please use a NFC enabled device to activate.</p>
        </>)}
        {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}</p>}
      </div>
        {isOffcanvasOpen && (
        <div className={`offcanvas nfc-reader offcanvas-top`}
        data-bs-scroll="true" data-bs-backdrop="false" tabIndex="-1" id="offcanvasActivation" aria-labelledby="offcanvasActivationLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-center m-auto" id="offcanvasActivationLabel">
            Card Activation
            </h5>

          </div>
          <div className="offcanvas-body mb-5">
            <div className="align-items-center mb-3">
              <PuffLoader className="m-auto" color="#109e77" size={120} />
            </div>
            <div className="align-items-center mb-3">
              {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}</p>}
            </div>
          </div>
        </div>
       )}

      </>
    );
  
};

export default NFCReaderWriter;
