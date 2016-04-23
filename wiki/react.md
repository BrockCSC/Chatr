# React
## What is React?
React is a JS library to create user interfaces. If you are familiar with Model-View-Controller pattern, React likes to describe itself as the 'View'.

With React, the idea is you build your interface as 'components' and separate your concerns.

React components are written in a new language called 'JSX'. All JSX allows you to do is write JavaScript and HTML. More on this below.

## Why React?
ReactJS is really good at managing state, which a chat app has a lot of. It's just a way to build interfaces.

## Let's talk about JSX
So what is JSX? It's a flavor of JavaScript we will be using to write our React components.

JSX basically allows us to write HTML as JavaScript.

I think it's worthwhile to investigate the benefits of writing in JSX.

Let's compare writing a unordered list in JSX vs regular JavaScript with React.

### JSX

```js
render() {
  return(
    <div>
      <ul>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
```

### Plain old JavaScript, using React.

```js
React.createElement(
  "ul",
  null,
  React.createElement("li", null),
  React.createElement("li", null),
  React.createElement("li", null),
);
```

Yup.. Imagine you had more nested elements? Yuck. JSX makes this alright to deal with.

## How to make React component
There are essentially 2 important things when making a React component

1) The basic structure of a class based component.

2) They contain two properties, `props` and `state`:

### basic structure of a class based React component
We will primarily use class based components, because they have an important feature called 'state'. There is another type of dummy component type called functional components, which simply return some HTML.
- Every component needs to extend the Component class.
- Every component needs a constructor with props as arguments. Each constructor needs to call super(props);
- Every component needs a render function that returns HTML or JSX.

```js
import React, { Component }  from 'react'; //import React and component class from React library.


// We are creating a component called myComponent,
//extending the Component class to use features of components.
class myComponent extends Component {

  //Every class based component, needs a constructor that calls super.
  constructor(props) {
    super(props);
  }


  //Every react component has a render function with a return statement.
  //It's here, and only here, where you will return HTML, written in JSX.
  render() {
    return (
      <div>
        Hello World
      </div>
    )
  }
}

//This line will allow us to use and declare our component.
export default myComponent;
```

### props
`props` - Short for 'properties'. Properties are essentially 'passed down to a Component (more on this below, see `#Thinking in React`), really similar to how you would pass a variable to a function as a parameter. Useful for when you want to share something between different components or want a component to know about something.

To explain this concept and how it's useful, lets take a look at our `app/main.js` an `app/components/Index.jsx`

#### main.js

```js
import React from 'react';
import ReactDOM from 'react-dom';
const socket = io.connect();
const ReactApp = require('./components/Index.jsx');
...

ReactDOM.render(<ReactApp socket = {socket}/>, ...);
```

Let's walk through this line by line, I've omitted the non important stuff with (...):
- In the first two lines, we are importing the react and react-dom library.
- In the third line, we are connecting our client socket to our socket io server, so we can send/get messages back from the server.
- fourth line, we are importing our React component from `components/Index.jsx`
- Here is where things get a bit interesting. We are calling ReactDOM.render, which at this point in time is not very important, all it does is mount our React application to some HTML div node, so that we can see it when we load our page. Let's analyze this line more thoroughly below

ReactDOM.Render takes in two parameters, a React component and a dom node.

What's really important here, is the React Component. Notice the weird syntax. What you are seeing is JSX.

```js
<ReactApp socket = {socket} />
```

To explain this, lets walk through a sub example. Say I had a React component, HelloWorld

```js
<HelloWorld/>
```

Say I wanted to pass a prop to it. I want the HelloWorld component to know my name, from a variable:

```js
let name = 'Bob Dylan'
<HelloWorld name = {name} />
```

Whenever we want to use JavaScript in JSX, we have to put braces around it. Right now we are doing something super simple, just passing a simple variable containing a string, but you could put entire functions and handlers there if you wanted to. For example, say we wanted to HelloWorld alert the user once they clicked on our component:

```js
let name = 'Bob Dylan'
<HelloWorld
  name = { name }
  OnClick = { (event) => {
    alert(`I'm not really Bob Dylan`);
  }}
/>
```

So now that we understand how to assign props, how do we access them within our component?

For example, going back to our Index component declaration

```js
<Index socket = { socket } />
```

So hopefully it is clear that we are now passing our socket as a prop. How can we access this socket, so we can emit and receive events?

It's really simple, in your component, you can access it as such:

```js
this.props.socket // Our socket thats connected to our server.
```

What about our HelloWorld component above?

```js
  <HelloWorld name = "Bob Dylan" />
```

simply access the name property passed in as:

```js
  this.props.name // 'Bob Dylan'
```

Let's take a look at our `Index.jsx` as an example of how it be used.

```js
import ChatTextBox from './ChatTextBox.jsx';
import  React, { Component } from 'react';
import ChatList from './ChatList.jsx';

let socket;

class Index extends Component {

  constructor(props) {
    super(props);
    ...

    //when we want to access a prop, we say 'this.props.nameofprop'
    socket = this.props.socket;

    //We now have our socket that was passed down to our component. We can do stuff with it now.
    socket.on('user:online', (numOnline) => {
      ...
    });

    socket.on('user:offline', (numOnline) => {
      ...
    });
  }

  render() {
    return (
        ...
    );
  }
}

//This line makes so we use the Index component.
export default Index;
```

### state
Now let's talk about `state`.

`state` - State is exactly that, it is a JavaScript object that holds the state of your app.

`state` is typically used when you want your component to hold some information and act on it. When you use `state` throughout your component, and that piece of `state` changes, your component will re-render on the page (Hence, why it's called React).

It's far easier to understand with an example. let's revisit our HelloWorld component.

We will now actually implement the HelloWorld as a class based component, with a piece of state.

Based on our skeleton above

```js

import React, { Component } from 'react';

class HelloWorld extends Component {

  constructor(props) {

    //To initialize state, we must initialize it within the constructor of class
    //based component, with `this.state = { key: value }`

    //in this example, say we were keeping track of how many times someone
    //clicked our name or something, we would have a piece of state with 'count'
    //as a key.


    //initialize state with a count property, initially at 0
    this.state = { count: 0 };

    //This is a React Gotcha. Whenever we use 'this' inside a function that,
    //we have written, we need to bind scope in the constructor like so.
    //We do this because our function doesn't know it has state, so we bind it's
    //scope to this components scope, which DOES have state.
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    ...
    //When a user clicks on our name or div, increment count by 1.
    //setState is a special function that notifies React that our state has
    //changed. When this is called, our component will re-render on the page.

    //Notice we use 'this.state.count', we can only do this because of that
    //line in our constructor

    //this.setState accepts an object with the key we want to change as well as
    //the new value.
    this.setState({count: this.state.count++});
  }

  // Remember, every react component has a render function.
  render() {
    //will return a div tag that contains Bob Dylan and how many times the name
    // was clicked.
    return(
      //Attach an event listener to our div, write a function to handle click.   
      <div onClick = { this.handleClick }>
        // Remember, when using JavaScript
        //or accessing JavaScript variables in JSX, they must be enclosed in {}.
        //this.props.name = 'Bob Dylan'
        { this.props.name }
        <div> {this.state.count} </div>
      </div>
    );
  }
}
```

I understand that is a long and confusing piece of code, but hopefully it clears up how to use state in React.

In summary:
- Initialize state in constructor with `this.state = {key:initialVal}`
- When you want your state to change via some event, call this.setState({key:newVal}).
- When using the keyword 'this' in custom functions, you need to bind the scope in the constructor.

TODO: Talk about lifecycle methods.

Okay, so at this point we know how to get started on React components, what state and props are.

Using state and props we can write some interactive components. But now need to figure out how to actually USE the react components.

### Using a react component
Say we had to two JSX files, `HelloWorld.jsx` and `HelloWorldContainer.jsx` in the same directory.

Our goal is to use HelloWorld in HelloWorldContainer.

To use HelloWorld, simply do as such:

```js
import React, {Component} from 'React'
import HelloWorld from './HelloWorld.jsx'

class HelloWorldComponent extends Component {
  constructor(props) {
    ....
  }

  render() {
    return (
      <div>
        <HelloWorld />
      </div>
    )
  }
}
```

That's it. Pass props in, do whatever you want, You can now use HelloWorld inside another React Component.

You just have to remember to attach the line `export default HelloWorld` inside HelloWorld.jsx to be able to use it.

## Styling React Components with CSS
To style React Components with CSS, you only need to do the following, say we had HelloWorld component again:

```js
class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        Hello World
      </div>
    )
  }
}
```

Say we want to make the text red. Make the following changes.

### HelloWorld.jsx

```js
class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    //returns <div class="redText"> Hello World </div>
    return(
      <div className = "redText">
        Hello World
      </div>
    )
  }
}
```

To style, make a `style.css` and link it where our React component gets rendered, on some HTML page.

### style.css

```css
.redText {
  color: red;
}
```

For Chatr, we have a global CSS stylesheet, in `public/css/style.css`. You can put your styles in there.

Now you probably still have a lot of questions. For that, I will recommend the ultimate resource, the official documentation for React. As well as actively asking questions on the Slack group, we are all here to help.

I highly suggest reading in this order:
- [Getting started with React](https://facebook.github.io/react/docs/tutorial.html)
- [JSX in Depth](https://facebook.github.io/react/docs/jsx-in-depth.html)
- [Thinking in React](https://facebook.github.io/react/docs/thinking-in-react.html)
