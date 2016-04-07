import ChatTextBox from './ChatTextBox.jsx';
import  React, { Component } from 'react';
import ChatList from './ChatList.jsx';
import io from 'socket.io-client';

let socket;

class Index extends Component {

  constructor(props) {
    super(props);
    this.state = { online: 0 };
    socket = io.connect(props.url);

    socket.on('user:online', (numOnline) => {
      this.setState({ online: numOnline });
    });

    socket.on('user:offline', (numOnline) => {
      this.setState({ online: numOnline });
    });
  }

  render() {
    return (
      <div>
         <div> Online: {this.state.online} </div>
        <ChatList socket = {socket}/>
        <ChatTextBox socket = {socket}/>
      </div>
    );
  }
}

export default Index;
