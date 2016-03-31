import React, { Component } from 'React';
import io from 'socket.io-client';

class ChatTextBox extends Component {

  constructor(props) {
    super(props);
    this.state = { term: '' };
    this.termChange = this.termChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.socket.emit('message:sent', this.state.term);
    this.setState({ term: '' });
  }

  termChange(event) {
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text"
        value={this.state.term}
        onChange={this.termChange} />
        <button onClick={this.handleClick}>Send Message</button>
        <div>{this.state.term}</div>
      </div>
    );
  }
}

export default ChatTextBox;
