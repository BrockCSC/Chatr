import ChatTextBox from './ChatTextBox.jsx';
import  React, { Component } from 'react';
import ChatList from './ChatList.jsx';
import io from 'socket.io-client';

let socket = io('https://cherry-crisp-34808.herokuapp.com/');

class Index extends Component {

  constructor(props) {
    super(props);
    socket.on('connect', () => {
      console.log('connected on client');
    });
  }

  render() {
    return (
      <div>
        <ChatList socket = {socket}/>
        <ChatTextBox socket = {socket}/>
      </div>
    );
  }
}

export default Index;
