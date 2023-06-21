import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function KeyModal({ secureKey, onClose }) {
  return (
    <Modal show={true} onHide={onClose} className="secureKeyModal">
      <Modal.Header closeButton className="btn-close-white">
        <Modal.Title>Your Private Key</Modal.Title>
      </Modal.Header>
      <Modal.Body><small className="card p-3 mt-4 text-muted">{secureKey}</small></Modal.Body>
      <Modal.Footer className="m-4">
        <Button variant="outline-success w-50 m-auto" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KeyModal;
