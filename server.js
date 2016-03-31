var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//React
var React = require('react');
var ReactDOMServer = require('react-dom/server');

//Component
var Index = require('./app/components/Index.jsx').default;

//Environment variables
const port = process.env.PORT || 3000;
const viewsPath = `${__dirname}/views`;

app.set('port', port);
app.set('views', viewsPath);
app.set('view engine', 'jade');

app.use(express.static('public'));

app.get('/', (req, res) => {
  var reactHTML = ReactDOMServer.renderToString(<Index/>);
  res.render('test', { reactHTML });
});

io.on('connection', (socket) => {
  console.log('server connected');

  socket.on('disconnect', () => {
    console.log('disconnected');
  });

  socket.on('message:sent', (message) => {
    io.emit('message:get', message);
  });

});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
