import React from 'react';
import QRCode from 'react-qr-code';

const modalQRCode = ({ showQRCode, onClose, onShare }) => {
  return showQRCode ? (
    <div className="modal" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-fullscreen-sm-down">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">My Sorrel Wallet</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="text-center">
              <QRCode value="Wallet Address!" />
            </div>
          </div>
          <div className="modal-footer m-auto">
            <button className="btn btn-lg btn-outline-secondary" type="button" onClick={onShare}>
              <i className="fa-solid fa-share"></i>&nbsp;
              Share QR Code
            </button>

            <button type="button" className="btn btn-lg btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default modalQRCode;
