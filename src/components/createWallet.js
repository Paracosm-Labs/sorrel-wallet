import React, { useState, useEffect } from 'react';
import TronWeb from 'tronweb';
import CryptoJS from 'crypto-js';
import crc from 'crc';
import { Modal, Button, Form } from 'react-bootstrap';

const CreateWallet = ({ onWalletCreation }) => {
  const [wallet, setWallet] = useState(null);
  const [pin, setPin] = useState('');
  const [showModal, setShowModal] = useState(true);

  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
    createWallet();
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

  return (
    <div>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Set PIN</Modal.Title>
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
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
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
