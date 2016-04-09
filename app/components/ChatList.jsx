import React, { Component } from 'react';

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.socket.on('message:get', (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  render() {

    let messageDivs = this.state.messages.map((message) => {
      return (
        <div key = {Math.floor(Math.random() * 1000)} className = "message">
          {message}
        </div>
      );
    });

    return (
      <div>
          {messageDivs}
      </div>
    );
  }
}

export default ChatList;
