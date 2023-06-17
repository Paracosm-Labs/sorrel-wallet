import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import BarLoader from "react-spinners/BarLoader";
import PuffLoader from "react-spinners/PuffLoader";


const NFCReaderWriter = ({ onNFCRead, address, encryptedPrivateKey, checksum, pinToReset, mode }) => {
  const [message, setMessage] = useState('');
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const [isPinReset, setIsPinReset] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
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
    setIsScanning(true);
    setMessage(`Please place card near to device and wait.`);

      try {
        await nfcReader.scan();
        
        nfcReader.onreading = ({ message, serialNumber }) => {
        try{
          const decoder = new TextDecoder();
          const data1 = decoder.decode(message.records[1].data);
          const data2 = decoder.decode(message.records[2].data);
          const parsedData1 = JSON.parse(data1);
          const parsedData2 = JSON.parse(data2);
          const parsedData = {...parsedData1, ...parsedData2};
          setMessage(``);
          onNFCRead(parsedData);
          setIsOffcanvasOpen(false);
        } catch (error){
          setMessage(`Failed to read. Please refresh and try again.: ${error}`);
        }
          toast.success(`Card Successfully Read.`, {
            icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
            theme: 'dark',
          });
        };
        setIsPinReset(false);
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
            address: data.address, 
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
      if (pinToReset) {
        setIsPinReset(true);
      }
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

  const setToReadOnly = async() => {
    try {
      await nfcReader.makeReadOnly();
      alert("Card is now read only.");
    }catch(error){
      alert(error);
    }
    
  };

    const defaultUI = (
    <div>
      
      <div className="m-4 mb-5 text-white">
      
        {nfcSupported ? (
          <>

          {/*`${isActivated} - ${pinToReset} - ${isPinReset}` */}

          {(!isActivated || (isActivated && pinToReset)) && (!isPinReset) ? (<>

            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-success`}
              onClick={() => writeNFC({ address, encryptedPrivateKey, checksum })}
            >
              {`Activate Card`}
            </button>
            <BarLoader className={`m-auto bg-primary`} color="#109e77" size={120} />

          </>):(``)}
            
          {isActivated && !isScanning && !isPinReset ? (<>

            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-success`}
               onClick={() => readNFC()}>
               {`Read Card`}
            </button>

            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-outline-success disabled d-none`}
              onClick={setToReadOnly}
            >
              Lock Card
            </button>

            <button className={`btn w-100 btn-lg mt-3 mb-3 btn-outline-success disabled`}
              onClick={() => writeNFC({ address, encryptedPrivateKey, checksum })}
            >
              Activated&nbsp;&nbsp;<i className="fa-solid fa-circle-check"></i>
            </button>

          </>):(``)}

          {isActivated && isScanning ? (<>

             <button className={`btn w-100 btn-lg mt-3 mb-3 disabled btn-outline-success`}
               onClick={() => readNFC()}>
                <PuffLoader className="m-auto bg-outline-primary" color="#109e77" size={40} /><br/>
                <small>Tap Card to Read Anytime</small>
              </button>


          </>):(``)}

        </>
        ) : (<>
          <button className="btn btn-outline-success w-100 btn-lg mt-3 mb-5 disabled">Activate Card</button>
          <p className="text-muted pb-5">NFC Reader is not available.<br/>Please use a NFC enabled device to activate.</p>
        </>)}
        {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}</p>}
      </div>
       

      
    </div>
    );

  
  const alternativeUI = (
    <div>

      {!isScanning ? (<>
          <button className={`btn btn-lg w-100 ${!nfcSupported ? `btn-outline-success disabled` : `btn-success`} `}
          onClick={() => readNFC()}
          >
          <i className="fas fa-credit-card me-2"></i>Login via Card<br/>
          {!nfcSupported ? (<small className="text-muted text-small">NFC not available on this device.</small>):(``)}
          </button>
      </>):(
         <button className={`btn w-100 btn-md mt-3 mb-3 disabled btn-outline-success`}
           onClick={() => readNFC()}>
            <PuffLoader className="m-auto bg-outline-primary" color="#109e77" size={40} /><br/>
            <small>Tap Card to Read Anytime</small>
          </button>
      )}

    </div>
  );  

  const miniUI = (
    <div>

      {!isScanning ? (<>
          <button className={`btn btn-lg w-100 ${!nfcSupported ? `btn-outline-success disabled` : `btn-success`} `}
          onClick={() => readNFC()}
          >
          <i className="fas fa-credit-card me-2"></i>Login via Card<br/>
          {!nfcSupported ? (<small className="text-muted text-small">NFC not available on this device.</small>):(``)}
          </button>
      </>):(
         <button className={`btn w-100 btn-md mt-3 mb-3 disabled btn-outline-success`}
           onClick={() => readNFC()}>
            <PuffLoader className="m-auto bg-outline-primary" color="#109e77" size={40} /><br/>
            <small>Tap Card to Read Anytime</small>
          </button>
      )}

    </div>
  );


  let uiToRender;
  switch (mode) {
    case 'alternative':
      uiToRender = alternativeUI;
      break;
    case 'mini':
      uiToRender = miniUI;
      break;
    default:
      uiToRender = defaultUI;
  }

  return (
    <div>
      {uiToRender}
        
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
              {message && <p className={`text-small p-2 ${isActivated ? `text-success`:``}`}>{message}<br/>{`${isActivated ? ``: `This may take up to 5 seconds to complete.`}`}</p>}
            </div>
          </div>
        </div>

    </div>
  );


  
};

export default NFCReaderWriter;
