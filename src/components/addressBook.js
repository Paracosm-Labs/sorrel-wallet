import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';

const AddressBook = () => {
  const dummyContacts = [
    { name: 'Alex van Anders', avatar: 'https://i.pravatar.cc/42?img=1' },
    { name: 'Javier Reyes', avatar: 'https://i.pravatar.cc/42?img=2' },
    { name: 'Michelle Ge', avatar: 'https://i.pravatar.cc/42?img=3' },
    { name: 'Marcus Toussaint', avatar: 'https://i.pravatar.cc/42?img=4' },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  const [scannedQR, setScannedQR] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setScannedQR(null); // Reset the scanned QR when selecting a new option
  };

  const handleScanQR = (data) => {
    if (data) {
      setScannedQR(data);
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div>
      <div className="mt-3 d-flex address-book">
        <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => handleOptionClick('qr')}>
            <i className="fa-solid fa-qrcode"></i>
            <small>Scan QR</small>
          </button>
        </div>
        <div className="align-items-center m-2">
          <button className="btn btn-sm h-100 btn-outline-secondary" onClick={() => handleOptionClick('nfc')}>
            <i className="fa-brands fa-nfc-symbol"></i>
            <small>Wallet NFC Card</small>
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
            <h5>To:</h5>
            {scannedQR ? (
              <>
                <p>Scanned QR: {scannedQR}</p>
                {/* Additional logic to process the scanned QR and update the "To" section */}
              </>
            ) : (
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScanQR}
                style={{ width: '300px' }}
              />
            )}
          </div>
        </div>
      )}

      {selectedOption === 'nfc' && (
        <div className="mt-3">
          <div className="text-center">
            <h5>To:</h5>
            <p>Wallet NFC Card</p>
            {/* Additional logic for handling the Wallet NFC Card */}
          </div>
        </div>
      )}

      {dummyContacts.includes(selectedOption) && (
        <div className="mt-3">
          <div className="text-center">
            <h5>To:</h5>
            <img
              src={selectedOption.avatar}
              alt={selectedOption.name}
              className="rounded-circle"
              width="100"
              height="100"
            />
            <p>{selectedOption.name}</p>
            {/* Additional logic for handling the selected contact */}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressBook;
