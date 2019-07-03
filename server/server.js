let express = require('express');
let app = express();
let server = require('http').Server(app);
var io = require('socket.io')(server);

// FIXME: 设置一个用来存储消息的全局变量
let messages = [];

io.on('connection', (socket) => {
	socket.emit('connected', {messages});
	socket.on('submit', (data) => {
		if (data) {
			messages.push({createTime: new Date().getTime(), ...data});
			socket.emit('transMessages', {messages});
			// FIXME: 要广播，只需添加一个广播标志来发出和发送方法调用。广播意味着向除启动消息客户端之外的所有其他人发送消息。
			socket.broadcast.emit('transMessages', {messages})
		}
	})
});

io.on('disconnect', ()=> {
	messages = []
});

server.listen(9002, () => {
	console.log('App is listening on 9002')
});
