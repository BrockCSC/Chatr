# Server
Now is a good time to talk about the backend.

We are using Node.js and Express as a framework for our backend. I will explain the gist of it below.

## What is Express?
Express is a framework for building out APIs and building node.js servers.

## Express basics.
To launch an express server:
- simply make a project directory, navigate to it in the terminal,
- run `npm install --save express`
- make a server.js file or some javascript file

in server.js, declare the following:

```js
var Express = require('express');

var app = express();

app.listen(3000, function() {
  console.log('listening on port 3000');
});
```

This will start an express server and listen on port 3000 by default.

## Hello World
Say we want to make our server say hello world whenever we reach localhost:3000 in our browser.

simply do

```js
var Express = require('express');

var app = express();

app.get('/', function(request, response) {
  res.send('hello world')
});

app.listen(3000, function() {
  console.log('listening on port 3000');
});
```

Lets talk about what's happening here. We have set up a route handler for our 'homepage'.

## app.get
App.get is one of the helper functions express provides for handling routes on GET requests (for POST requests, we have app.post). It takes in two parameters, a relative path and a `callback` containing `(request, response)` as parameters.

When someone navigates to that route, the code in the callback will be executed.

Example, say we had

```js
  app.get('/dogs', function(req, res) {
    res.send('dogs');
  });
```

If you went to [https://localhost:3000/dogs](https://localhost:3000/dogs), you would get back a response saying 'dogs'.

### request and response
The real basic lowdown of it is this.

`request` is an object that contains the relevant information about the request to access that route.

`response` is used to send something BACK to the user, a response to the request.

They both have a lot of properties, and is best explored in the proper express.js documentation.

The main one we have been using up until this point is simply `response.render`, which renders an HTML page as a response when someone makes a GET request from their browser to our homepage.

## middleware and app.use
Middleware functions are basically functions that have access to our request and response objects.

As of the latest commit we are only using Application Level Middleware.

You can read about the different types of Middleware and what it even is on the [Express website](http://expressjs.com/en/guide/using-middleware.html)

For example, in our server.js file, we have a line that exposes our public directory.

```js
app.use(express.static('public'));
```

This makes it so we can access static resources in our public directory, useful when linking css or javascript on the client side.

As of right now, we aren't using any major middleware, but middleware will come in handy when trying to implement features like User Authentication and so on.

## in Chatr
In Chatr, here is our server.js. I've omitted non important stuff.

Play by play:
- We start with declaring express
- Setting up HTTP and Socket IO
- Set proper variables for port and url for socket.io
- (Process.env.PORT and Process.env.URL are environment variables exposed by Heroku.)
- (If they are not present, we default to [http://localhost:3000](http://localhost:3000))
- declare a path where views are located.
- Set the port, views and view engine.
- (A view engine is simply describes a templating engine, we use [jade](http://jade-lang.com/tutorial/) to template HTML)

```js
const express = require('express');
const app = exports.app =  express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

//Environment variables and paths
const port = process.env.PORT || 3000;
const url = process.env.URL || `http://localhost:${port}`;

const viewsPath = `${__dirname}/views`;

app.set('port', port);
app.set('views', viewsPath);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

...

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
`
```
