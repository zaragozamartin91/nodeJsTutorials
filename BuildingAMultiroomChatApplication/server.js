/*Built-in http module provides HTTP
server and client functionality*/
var http = require('http');
var fs = require('fs');

// Built-in path module provides filesystem path–related functionality
var path = require('path');

// Add-on mime module provides ability to derive a MIME type based on a filename extension
var mime = require('mime');

//The cache variable will be used to cache file data (file contents)
//key: file abs path , value: fie contents
var cache = {};



// HELPER FUNCTIONS--------------------------------------------------------------------------

//will handle the sending of 404 errors when a file is requested that doesn’t exist
function send404(response) {
	response.writeHead(404, {
		'content-type': 'text/plain'
	});
	response.write('Error 404: resource not found...');
	response.end();
}

//The function first writes the appropriate HTTP headers and then sends the contents of the file
function sendFile(response, filePath, fileContents) {
	response.writeHead(200, {
		'content-type': mime.lookup(path.basename(filePath))
	});
	response.end(fileContents);
}

/*Our chat application will cache static files to memory, only reading them from disk the first
time they’re accessed. The next helper determines whether or not a file is cached and,
if so, serves it. If a file isn’t cached, it’s read from disk and served. If the file doesn’t
exist, an HTTP 404 error is returned as a response
*/
function serveStatic(response, cache, absPath) {
	if (cache[absPath]) {
		sendFile(response, absPath, cache[absPath]);
		return;
	}

	fs.exists(absPath, function(exists) {
		if (exists) {
			fs.readFile(absPath, function(err, data) {
				if (err) {
					send404(response);
					return;
				}

				cache[absPath] = data;
				sendFile(response, absPath, data);
			});
			return;
		}

		send404(response);
	});
}

// HELPER FUNCTIONS END--------------------------------------------------------------------------

var port = 3000;
var server = http.createServer(function(req, res) {
	var filePath = false;

	if (req.url == '/') {
		filePath = 'public/index.html';
	} else {
		filePath = 'public' + req.url;
	}

	var absPath = './' + filePath;
	serveStatic(res, cache, absPath);
});

/*Server esta escuchando de forma asincrona*/
server.listen(port, function() {
	console.log("Server listening at " + port);
});

/*chat_server.js es un modulo realizado por nosotros*/
var chatServer = require('./lib/chat_server.js');
chatServer.listen(server);

