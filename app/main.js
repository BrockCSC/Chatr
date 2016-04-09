import React from 'react';
import ReactDOM from 'react-dom';
const socket = io.connect();
const ReactApp = require('./components/Index.jsx').default;
const url = `${document.location.protocol}//${document.location.host}`;
const mountNode = document.getElementById('react-root');

ReactDOM.render(<ReactApp socket = {socket}/>, mountNode);
