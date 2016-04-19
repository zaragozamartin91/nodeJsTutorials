var net = require('net');

var server = net.createServer(function(socket) {
	/*data events handled whenever new data has been read*/
	socket.on('data', function(data) {
		/*Data is written (echoed back) to client*/
		socket.write('reply: ' + data);
		console.log(data + ' replied');
	});
});

var port = 3000;
console.log("listening port " + port);
server.listen(port);