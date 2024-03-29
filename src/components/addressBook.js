import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import PuffLoader from "react-spinners/PuffLoader";

const AddressBook = ({ onContactSelect, sorrelAddress}) => {
  const dummyContacts = [
    { name: 'Alex van Anders', avatar: '/img/alex.jpg', address: 'TLHKdCL7MiwT73rBrq8TXnANZ4VKH1P3kt' },
    { name: 'Javier Reyes', avatar: '/img/javier.jpg', address: 'TK5ruyDhV34sho8npBTd8JZAYeo418gKMu' },
    { name: 'Michelle Ge', avatar: '/img/michelle.jpg', address: 'TTGu1xz54GXLwqAypitX4h8TeMWgWekG6e' },
    { name: 'Marcus Toussaint', avatar: '/img/marcus.jpg', address: 'TS7PDkLehxwA91HUf6Y3iGHZa5ehrMGYvB' },
  ];


  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [scannedQR, setScannedQR] = useState(null);
  const [nfcSupported, setNfcSupported] = useState(false);
  const [nfcReader, setNfcReader] = useState(null);


  const handleOptionClick = (option, address) => {
    setSelectedOption(option);

    if (option === 'nfc') {
      handleScanNFC();
      onContactSelect(selectedAddress);
      setSelectedAddress(null);
    }
     if (option === 'qr'){
      // setSelectedAddress(scannedQR);
      onContactSelect(scannedQR);      
      setScannedQR(null); // Reset the scanned QR when selecting a new option

    }
     if (typeof option === 'object'){
      setSelectedAddress(address);
      onContactSelect(address);

    }
    setShowModal(false);
    console.log(selectedAddress, address,  option);
  };

  const handleScanQR = (data) => {
    if (data) {
      setScannedQR(data?.text);
    }
    setSelectedAddress(scannedQR);
  };


  useEffect(() => {
    if ('NDEFReader' in window) {
      setNfcSupported(true);
      setNfcReader(new window.NDEFReader());
      
    }
  }, []);


  const handleScanNFC = async () => {
    if (!nfcReader) return;
    
    try {
      await nfcReader.scan();
      nfcReader.onreading = ({ message, serialNumber }) => {
        setSelectedOption('nfc');
        const decoder = new TextDecoder();
        const data = decoder.decode(message.records[1].data);
        const parsedData = JSON.parse(data);
        const addr = parsedData.address.base58;

        setSelectedAddress(addr);
        onContactSelect(addr);
      };
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };



  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleError = (error) => {
    console.error(error);
  };



  return (
    <div>
      <div className={sorrelAddress ? `d-none address-book ${sorrelAddress}` : "d-flex address-book"}>
        <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => handleOptionClick('qr')}>
            <i className="fa-solid fa-qrcode"></i>
            <small>Scan QR</small>
          </button>
        </div>
      {nfcSupported && (<>
      <div className="align-items-center m-2">
        
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => handleOptionClick('nfc')}>
            <i className="fa-brands fa-nfc-symbol"></i>
            <small>Wallet NFC Card</small>
          </button>
      </div>
      </>)}
       <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => setShowModal(true)}>
            <i className="fa-solid fa-address-book"></i>
            <small>My Contacts</small>
          </button>
        </div>
        {dummyContacts.map((contact, index) => (
          <div key={index} className="align-items-center m-2">
            <button
              className="btn btn-sm h-100 btn-outline-secondary"
              onClick={() => handleOptionClick(contact, contact.address)}
            >
              <img src={contact.avatar} alt={contact.name} className="rounded-circle" width="50" height="50" />
              <small className="">{contact.name}</small>
            </button>
          </div>
        ))}
      </div>
      <div className="contact-select">
      {selectedOption === 'qr' && (
        <div className="mt-3">
          <div className="text-center">
            <h6 className="badge bg-success">To QR Address</h6>
            {scannedQR ? (
              <>
                <p>{scannedQR}</p>
                {/* Additional logic to process the scanned QR and update the "To" section */}
              </>
            ) : (
            <>
               <QrReader
                delay={300}
                onError={handleError}
                constraints= {{facingMode:  'environment' }}
                onResult={handleScanQR}
                style={{ width: '300px' }}
              /> 
            </>
            )}
          </div>
        </div>
      )}

      {selectedOption === 'nfc' && (
        <div className="mt-3">
          <div className="text-center">
            <h6 className="badge bg-success">To Wallet NFC Card</h6>
            
            {!selectedAddress ? <PuffLoader className="m-auto" color="#109e77" size={40} /> : <p>{selectedAddress}</p>}

          </div>
        </div>
      )}

      {selectedOption && typeof selectedOption === 'object' && (
        <div className="mt-3 text-center">
            <img
              src={selectedOption.avatar}
              alt={selectedOption.name}
              className="rounded-circle"
              width="50"
              height="50"
            />
          <div className="text-center">
            <p>{selectedOption.name}</p>                       
            {/* Additional logic for handling the selected contact */}
          </div>
        </div>
      )}

      {sorrelAddress ? (
        <div className="mt-3">
          <div className="text-center">
            <h5 className="badge bg-info p-2">Sorrel Transfer</h5>
            <p>{sorrelAddress}</p>
          </div>
        </div>
      ):(
        <div></div>
      )}
      </div>




      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="contacts modal-dialog modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Contacts</h5>
                <button type="button" className="btn-close btn-close-white" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {dummyContacts.map((contact, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-secondary text-start m-1"
                      onClick={() => handleOptionClick(contact, contact.address)}
                    >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="rounded-circle me-2"
                      width="50"
                      height="50"
                    />

                      {contact.name}

                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-secondary w-100 p-2" onClick={handleModalClose}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AddressBook;
