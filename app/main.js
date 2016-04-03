import React from 'react';
import ReactDOM from 'react-dom';
const ReactApp = require('./components/Index.jsx').default;
const url = `${document.location.protocol}//${document.location.host}`;
const mountNode = document.getElementById('react-root');

ReactDOM.render(<ReactApp url = {url}/>, mountNode);
