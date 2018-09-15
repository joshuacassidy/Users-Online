var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
let allClients = [];

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

let connectCounter = 0;
io.on('connection', function(socket) {
	connectCounter++;
	socket.on('disconnect', function(msg) {
		connectCounter--;
		io.emit('disconnect', connectCounter);
	});

	socket.on('connected', function(msg) {
		io.emit('connected', connectCounter);
	});
});

http.listen(port, function() {
	console.log('listening on *:' + port);
});
