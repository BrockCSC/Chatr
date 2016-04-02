var React = require('react');
var ReactDOM = require('react-dom');
var ReactApp = require('./components/Index.jsx').default;
var mountNode = document.getElementById('react-root');

ReactDOM.render(<ReactApp/>, mountNode);
