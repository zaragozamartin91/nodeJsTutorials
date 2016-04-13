var http = require('http');
var fs = require('fs');

var port = 3000;
var server = http.createServer(function(req, res) {
	res.writeHead(200, {
		'content-type': 'image/png'
	});

	/*Readable and writable streams can be connected to make pipes, much like you can
	do with the | (pipe) operator in shell scripting. This provides an efficient way to write
	out data as soon as it’s ready*/
	fs.createReadStream('./image.png').pipe(res);
});

server.listen(port);

console.log('server listenting at port ' + port);