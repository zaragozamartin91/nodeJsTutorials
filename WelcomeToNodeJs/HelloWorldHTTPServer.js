//In Node, the server and the application are the same.

var http = require('http');

var port = 3000;
var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'
	});
	res.end('hello world!\n')
});

server.listen(port);
console.log('Server listening at port ' + port);