import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PuffLoader from "react-spinners/PuffLoader";

class NFCReaderWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
      nfcAvailable: 'NDEFReader' in window,
    };
  }

  componentDidMount() {
    if (this.state.nfcAvailable) {
      this.reader = new window.NDEFReader();
    }
  }

  readNFC = async () => {
    try {
      await this.reader.scan();
      this.reader.onreading = ({ message, serialNumber }) => {
        const decoder = new TextDecoder();
        const addr = decoder.decode(message.records[0].data);
        this.setState({ message: `Public address: ${addr}` });
      };
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  writeNFC = async (data) => {
    this.setState({ message: 'Please place your card near to your phone' });
    try {
      await this.reader.write({ records: [{ recordType: "text", data }] });
      this.setState({ message: 'Public address written successfully.' });
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  render() {
    const { message, error, nfcAvailable } = this.state;
    return (
      <>
      <div className="m-5 text-white">
      
        {nfcAvailable ? (
          <>
            {/* <button className="btn btn-outline-success w-100 btn-lg mt-3" onClick={this.readNFC}>Read Card</button> -- */}
            <button className="btn btn-outline-success w-100 btn-lg mt-3 mb-3" 
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasActivation"
              aria-controls="offcanvasActivation"
              onClick={() => this.writeNFC(this.props.publicAddress)}
            >Activate Card</button>


        </>
        ) : (<>
          <button className="btn btn-outline-success w-100 btn-lg mt-3 mb-3 disabled">Activate Card</button>
          <p className="text-muted">NFC Reader was not found.<br/>Please use a NFC enabled device to activate.</p>
        </>)}
        {message && <p>{message}</p>}
        {/* error && <p>{error}</p> */} 
      </div>

        <div className="offcanvas nfc-reader offcanvas-top" tabIndex="-1" id="offcanvasActivation" aria-labelledby="offcanvasActivationLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title text-center m-auto" id="offcanvasActivationLabel">
            Card Activation
            <p className="text-muted">Please place your card near to your phone</p>
            </h5>

          </div>
          <div className="offcanvas-body mb-5">
            <div className="align-items-center mb-3">
              <PuffLoader className="m-auto" color="#109e77" size={120} />
            </div>
          </div>
        </div>


      </>
    );
  }
}

export default NFCReaderWriter;
