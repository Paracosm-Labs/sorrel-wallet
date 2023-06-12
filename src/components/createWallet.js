import React, { useState } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSubmit = () => {
    if (modalTitle === 'Set PIN') {
      createWallet();
    } else if (modalTitle === 'Check Private Key' && wallet) {
      checkPrivateKey();
    }
    setShowModal(false);
  };

  const createWallet = () => {
    TronWeb.createAccount().then(newWallet => {
      // Encrypt the private key with the pin
      const cipher = CryptoJS.AES.encrypt(newWallet.privateKey, pin).toString();
      // Generate a CRC32 checksum of the cipher
      const checksum = crc.crc32(cipher).toString(16);
      // Create a new wallet object with the encrypted private key and checksum
      const secureWallet = {
        ...newWallet,
        privateKey: cipher,
        checksum: checksum
      };
      setWallet(secureWallet);
      onWalletCreation(secureWallet);
    });
  };

  const checkPrivateKey = () => {
    const bytes = CryptoJS.AES.decrypt(wallet.privateKey, pin);
    const originalPrivateKey = bytes.toString(CryptoJS.enc.Utf8);
    alert(`Your private key is: ${originalPrivateKey}`);
  };

  const handleCreateWallet = () => {
    setModalTitle('Set PIN');
    setShowModal(true);
  };

  const handleCheckPrivateKey = () => {
    if (wallet) {
      setModalTitle('Check Private Key');
      setShowModal(true);
    } else {
      alert('Please create a wallet first.');
    }
  };

  return (
    <div>
      <Button className="btn btn-outline-success m-2" onClick={handleCreateWallet}>Create Wallet</Button>
      <Button className="btn btn-outline-secondary m-2" onClick={handleCheckPrivateKey}>Check Private Key</Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formPin">
              <Form.Label>6-Digit PIN</Form.Label>
              <Form.Control type="password" placeholder="Enter PIN" value={pin} onChange={handlePinChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      {wallet && (
        <div className="text-white m-3">
          <small>Public Address: {wallet.address.base58}</small><br/>
          <small>Private Key: ******</small>
        </div>
      )}
    </div>
  );
};

export default CreateWallet;
