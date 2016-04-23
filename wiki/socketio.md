# Socket.io
## What is socket.io?
Socket.IO is a JavaScript library for realtime web applications. It enables realtime, bi-directional communication between web clients and servers. (Straight from the Wikipedia page, yeah).

## How to use
To use socket.io, you need to setup both on the server, and the client.

### set up on the server.
Let's look at our `server.js` to see how it was set up with express.

```js
const express = require('express');
const app = exports.app =  express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

...
```

So from top to bottom, that's all you need to do to setup socket.io from the server.

### set up on the client
On the client side, let's look at the `index.jade` which will template out HTML

```jade
html
    script(src="/socket.io/socket.io.js")
    body
        div#container
            div(id='react-root')
    script(src="./main.js")
```

here is the rendered HTML

```html
<!DOCTYPE html>
<html>
  <script src="/socket.io/socket.io.js"></script>
  <body>
    <div class="container">
      <div id="react-root">
      </div>
    </div>
  </body>
  <script src="./main.js"></script>
</html>
```

The relevant tag is `<script src="/socket.io/socket.io.js"></script>`

This is the client side library that is automatically exposed by the express server when you set it up with socket.io on the server side of things.

## connection setup
Now time to set up the connection between server and client.

We will again do this in two steps, first set up on the server, then set up on the client.

Let's start with the client first this time.

### connection setup on the client.
If you have been following this wiki in order, you might have already seen our `app/main.js` file that gets bundled on the client side. It is here where we utilize the connection from client side to server.

#### `app/main.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
const socket = io.connect();
const ReactApp = require('./components/Index.jsx').default;
const mountNode = document.getElementById('react-root');

ReactDOM.render(<ReactApp socket = {socket}/>, mountNode);
```

Notice the line `const socket = io.connect();`

If you are wondering where `io.connect()` came from, recall our rendered HTML.

```html
<!DOCTYPE html>
<html>
  <script src="/socket.io/socket.io.js"></script>
  ...
  <script src="./main.js"></script>
</html>
```

Notice that our socketio client library is being referenced BEFORE our bundled main.js file. So we absolutely have access to the socket.io client library.

Now onto explaining what `io.connect()` actually does.

Simply put, it connects to a socket.io server, using the url of the webpage it was 'rendered' on.

So once `io.connect()` is called, it connects to our socket.io instance on the server.

### connection set up on the server
Now onto the server.

Going to preface my comments saying we don't actually have any set up to do, rather simply listen for events defined in the API.

Let's look at `server.js`

```js
const express = require('express');
const app = exports.app =  express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

...

io.on('connection', (socket) => {
  ...
  //Do stuff if connection is established on the client.
});

...
```

As you can see, we have a handler which is listening for a connection event from the client.

It is here where we will emit events, and talk back to the client.

## Message Flow
In order to work with socket.io, I think it's important to understand the flow.

Here is an image outlining the flow when a chat message is sent.

![Message Flow](http://i.imgur.com/gKY0pWY.png)

As you can see, its a bit of back and forth between client and server.

'some event is emitted by client => event is caught from server, some response back to client => client handles response'

Now for the actual useful socket.io methods for emitting events.

### `socket.on` and `socket.emit`
Note, parameters outlined in braces '[]' are optional.

`socket.emit('event', [params])`

socket.emit is used to emit events on both the client and server.

`socket.on('event', callback([params]) {...})`

socket.on takes in two parameters, an event string that should match the emitted event, and a callback function with optional parameters.

let's start at the top, `ChatTextBox.jsx`, where the first event is emitted.

#### app/components/ChatTextBox.jsx

```js
class ChatTextBox extends Component {

  ...

  handleClick(event) {
    //Everytime a button is clicked, emit the message:sent event
    this.props.socket.emit('message:sent', this.state.term);

    //Clear the current message for the next message.
    this.setState({ term: '' });
  }

  termChange(event) {
    //Every time the term in the textbox changes, set the state of the textbox term to the new value
    this.setState({ term: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text"
        className = "textbox"
        value={this.state.term}
        //every time the term in the textbox changes, call termChange
        onChange={this.termChange} />
        //onButtonClick, call our handleClick function.
        <button className = "msgButton" onClick={this.handleClick}>Send Message</button>
        //Display text down below
        <div>{this.state.term}</div>
      </div>
    );
  }
}
...
```

So what's happening here?

The flow in `ChatTextBox.jsx` is as follows
- Everytime the text in the textbox changes, we are calling `termChange()`, which updates the current message, `term`.
- Everytime we click the Send Message button, we are calling `handleClick()`, which emits a socket.io event called `message:sent` with the current `term` as a parameter.

Okay, so we emitted the message.

Now onto the server code in `server.js`

#### server.js

```js
const express = require('express');
const app = exports.app =  express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

...

io.on('connection', (socket) => {
  ...

  //On the message:sent event...
  socket.on('message:sent', (message) => {
    //Emit the message:get event, with the message we just got
    io.emit('message:get', message);
  });

  ...

});

...
```

So what's happening here?
- On the `message:sent` event, which we know will have a message attached with it, then
- emit the `message:get` event with the message attached.

Finally to finish off the flow, let's look at `ChatList.jsx`

#### ChatList.jsx

```js
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
```

So what's happening?
- in the constructor, initialize state with a `messages` key which will represent an array of messages.
- Look at `componentDidMount()`. `componentDidMount()` is a React lifecycle method detailed in the React section of the wiki and in the React docs, but basically if the component was 'mounted' then attach a event onto the socket we recieved as a `prop`, which listens for a `message:get` event.
- On said `message:get` event, set the state of the `messages` array to an array containing all the previous messages + the new message.
- Look in our `render()` function. recall that when state changes, the render function is called. So we are building the divs of messages in `messageDivs` then returning those divs.
