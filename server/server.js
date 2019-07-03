let express = require('express');
let app = express();
let server = require('http').Server(app);
var io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.emit('connected')
});

server.listen(9002, () => {
	console.log('App is listening on 9002')
});
