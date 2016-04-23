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

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('index');
});

io.on('connection', (socket) => {
  io.emit('user:online', Object.keys(io.sockets.connected).length);

  socket.on('message:sent', (message) => {
    io.emit('message:get', message);
  });

  socket.on('disconnect', () => {
    io.emit('user:offline', Object.keys(io.sockets.connected).length);
  });

});

http.listen(port, () => {
  console.log(`listening on port ${port}`);
});
