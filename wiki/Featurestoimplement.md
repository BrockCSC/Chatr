# Features to implement
## Front end
### Problem 1
Our front end is hideous. Write some CSS to make it pretty.

### How to get started?
Here's an example styling a component. Say we wanted to make each message divs background red (for whatever reason)

Here's how we would do that.

in `app/components/ChatList.jsx`

```js
import React, { Component } from 'react';

class ChatList extends Component {
  ...
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
```

Notice in our render function, inside messageDivs (which is an array of message divs.. shocking), each message div contains a class of "message", specified in className.

Okay, so now just write a rule for that div tag.

in public/css/style.css, let's write a rule to make each of those divs red.

in `public/css/style.css`

```css

.message {
  background: red;
}
```

Feel free to add classNames and rules to our stylesheet, mess around and make it nicer.

### Problem 2
Implement the feature of sending messages when we hit the enter key. Hitting the send message button is super annoying.

### How to get started?
`input` elements in html have something called a [onKeyPress event](http://www.w3schools.com/jsref/event_onkeypress.asp)

Similarly, React has one too, [onKeyPress](https://facebook.github.io/react/docs/events.html#keyboard-events)

One way of doing this is attaching the onKeyPress event to the ChatTextBox input form (very similar to how we are handling the onClick event when the button is clicked!), than handling emitting the message (hint, we already have a means of emitting a message in `app/components/ChatTextBox#handleClick()`, we just need to call that function when we hit the Enter key)

## Remarks
If you are interested in getting started on these features, please message on the Slack, let us know which one you are taking care of. If you need any assistance, message on the Slack!

For any other feature ideas, message on the Slack!
