# Chatr  [![Build Status](https://travis-ci.org/BrockCSC/Chatr.svg?branch=master)](https://travis-ci.org/BrockCSC/Chatr)
The first CSC Project Series project. A Chat program to teach the basics of networking

Now with Slack, TravisCI and Heroku integration.

# Stack
- React.JS as frontend framework, with server-sided rendering.
- Node.js + Express + MongoDB as backend.
- Socket.io as realtime framework.
- Mocha + Chai as unit testing framework.
- Heroku as deployment.

# File structure
```
Note, (...) means it's a directory.

├── app (...)
│   ├── components (...) --> react components here
│   └── main.js --> file to be bundled on client side
├── gulpfile.js --> gulp configuration file, needed for bundling
├── node_modules (...) --> dependencies
├── package.json
├── public (...)
	└── css (...) --> folder containing stylesheets
│   └── main.js --> bundled file
├── server.js --> app entry point, launches express server.
├── test --> folder containing tests and test helper engine
│   ├── components (...) --> tests for each component go here
│   └── test_helper.js --> test helper engine
└── views (...) --> folder containing main views, jade templates```
```

# [Demo](http://brockcsc-chatr.herokuapp.com/)

## Please visit our [Wiki](https://github.com/BrockCSC/Chatr/wiki) for information on the stack, and how to contribute!
