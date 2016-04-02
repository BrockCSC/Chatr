import React, { Component } from 'react';

class ChatList extends Component {

  constructor(props) {
    super(props);
    this.state = { messages: [] };
  }

  componentDidMount() {
    this.props.socket.on('message:get', (message) => {
      console.log('we got here');
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  render() {
    return (
      <div>
        <ul className = "chat-list">
          {this.state.messages}
        </ul>
      </div>
    );
  }
}

export default ChatList;
