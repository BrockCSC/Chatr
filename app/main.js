var React = require('react');
var ReactDOM = require('react-dom');
var ReactApp = require('./components/Index.jsx').default;
var location = window.location.hostname;
var mountNode = document.getElementById('react-root');

ReactDOM.render(<ReactApp location={location}/>, mountNode);
