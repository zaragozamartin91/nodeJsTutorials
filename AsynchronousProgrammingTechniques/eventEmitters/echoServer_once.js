var net = require('net');

var server = net.createServer(function(socket) {
	/*listeners can be defined to respond only once.*/
	socket.once('data', function(data) {
		socket.write('reply: ' + data);
		console.log(data + ' replied');
	});
});

var port = 3000;
console.log("listening port " + port);
server.listen(port);