import React, { Component } from 'react';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

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
        this.setState({ message: `Public address: ${message.records[0].data}` });
      };
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  writeNFC = async (data) => {
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
      <div>
        <button onClick={this.readNFC}>Read NFC</button>
        <button onClick={() => this.writeNFC(this.props.publicAddress)}>Write NFC</button>
        {message && <p className="text-white">{message}</p>}
        {error && <p className="text-white">{error}</p>}
      </div>
    );
  }
}

export default NFCReaderWriter;
