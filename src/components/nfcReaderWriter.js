import React, { Component } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoImg from '../img/logo2x.png';
import PuffLoader from "react-spinners/PuffLoader";

class NFCReaderWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      nfcAvailable: 'NDEFReader' in window,
      isOffcanvasOpen: true,
      isActivated: false,
    };
    this.offcanvasElement = React.createRef(); // Create a ref for the offcanvas
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
  this.setState({ message: 'Please place your card near to your phone and wait.', isOffcanvasOpen: true });
  try {
    const records = [
      { recordType: "text", data: new TextEncoder().encode(data.publicAddress) },
      { recordType: "text", data: new TextEncoder().encode(data.privateKey) },
      { recordType: "text", data: new TextEncoder().encode(data.dummyProp1) },
      { recordType: "text", data: new TextEncoder().encode(data.dummyProp2) },
      { recordType: "text", data: new TextEncoder().encode(data.dummyProp3) },
    ];
    await this.reader.write({ records });
    this.setState({ message: 'Card Successfully Activated.', isOffcanvasOpen: false, isActivated:true });
    toast.success(`Card Successfully Activated.`, {
      icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
      theme: 'dark',
    });
  } catch (error) {
    this.setState({ isOffcanvasOpen: false });
    toast.error(`${error}`, {
      icon: ({ theme, type }) => <img src={LogoImg} alt="Sorrel Logo" className="rounded-circle me-5" height="24" />,
      theme: 'dark',
    });
  }
};

  render() {
    const { message, nfcAvailable, isOffcanvasOpen, isActivated } = this.state;
    const { publicAddress, privateKey, dummyProp1, dummyProp2, dummyProp3 } = this.props;
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
              onClick={() => this.writeNFC({ publicAddress, privateKey, dummyProp1, dummyProp2, dummyProp3 })}
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
  }
}

export default NFCReaderWriter;
