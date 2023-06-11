import React, { Component } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class NFCReaderWriter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      error: '',
    };
  }

  componentDidMount() {
    this.reader = new window.NDEFReader();
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
    this.setState({ message: 'Please place your card to your phone' });
    try {
      await this.reader.write({ records: [{ recordType: "text", data }] });
      this.setState({ message: 'Public address written successfully.' });
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  render() {
    const { message, error } = this.state;

    return (
      <div className="">
      <img src="/img/cards-mockup.jpg" className="w-100" />
      <div className="m-5">
        <button className="btn btn-outline-success w-100 btn-lg mt-3">Order Card</button>
        <button className="btn btn-outline-success w-100 btn-lg mt-5" onClick={this.readNFC}>Read Card</button>
        <button className="btn btn-outline-success w-100 btn-lg mt-3" onClick={() => this.writeNFC(this.props.publicAddress)}>Activate Card</button>
        {message && <p className="text-white  mt-5">{message}</p>}
        {error && <p className="text-white">{error}</p>}
      </div>
      </div>
    );
  }
}

export default NFCReaderWriter;
