import React, { Component } from 'react';

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
        this.setState({ message: `Serial number: ${serialNumber}` });
      };
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  writeNFC = async (data) => {
    try {
      await this.reader.write(data);
      this.setState({ message: 'Data written successfully.' });
    } catch (error) {
      this.setState({ error: `Error: ${error}` });
    }
  };

  render() {
    const { message, error } = this.state;

    return (
      <div>
        <button onClick={this.readNFC}>Read NFC</button>
        <button onClick={() => this.writeNFC('Hello NFC!')}>Write NFC</button>
        {message && <p>{message}</p>}
        {error && <p>{error}</p>}
      </div>
    );
  }
}

export default NFCReaderWriter;
