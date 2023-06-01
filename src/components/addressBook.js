import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const AddressBook = () => {
  const dummyContacts = [
    { name: 'Alex van Anders', avatar: '/img/alex.jpg' },
    { name: 'Javier Reyes', avatar: '/img/javier.jpg' },
    { name: 'Michelle Ge', avatar: '/img/michelle.jpg' },
    { name: 'Marcus Toussaint', avatar: '/img/marcus.jpg' },
  ];

  const [showModal, setShowModal] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [scannedQR, setScannedQR] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowModal(false);
    setScannedQR(null); // Reset the scanned QR when selecting a new option
  };

  const handleScanQR = (data) => {
    if (data) {
      setScannedQR(data?.text);
    }
  };


  const handleModalClose = () => {
    setSelectedContact(null);
    setShowModal(false);
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <div className="d-flex address-book">
        <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => handleOptionClick('qr')}>
            <i className="fa-solid fa-qrcode"></i>
            <small>Scan QR</small>
          </button>
        </div>
        <div className="align-items-center m-2 d-none">
          <button className="btn btn-sm h-100 btn-outline-secondary disabled" onClick={() => handleOptionClick('nfc')}>
            <i className="fa-brands fa-nfc-symbol"></i>
            <small>Wallet NFC Card</small>
          </button>
        </div>
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
              onClick={() => handleOptionClick(contact)}
            >
              <img src={contact.avatar} alt={contact.name} className="rounded-circle" width="50" height="50" />
              <small className="text-muted">{contact.name}</small>
            </button>
          </div>
        ))}
      </div>

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
            {/* Additional logic for handling the Wallet NFC Card */}
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


      {showModal && (
        <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-fullscreen-sm-down">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">My Contacts</h5>
                <button type="button" className="btn-close" onClick={handleModalClose}></button>
              </div>
              <div className="modal-body">
                <div className="list-group">
                  {dummyContacts.map((contact, index) => (
                    <button
                      key={index}
                      className="btn btn-outline-secondary text-start m-1"
                      onClick={() => handleOptionClick(contact)}
                    >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="rounded-circle me-3"
                      width="50"
                      height="50"
                    />

                      {contact.name}
                      
                    </button>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleModalClose}>
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
