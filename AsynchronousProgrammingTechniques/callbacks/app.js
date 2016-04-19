var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res) {
	if (req.url == '/') {
		/*Read JSON file and use callback to define what to do with its contents*/
		fs.readFile('./titles.json', function(err, data) {
			if (err) {
				/*If error occurs, log error and return “Server Error” to client*/
				console.error(err);
				return res.end('Server error');
			}

			var titles = JSON.parse(data.toString()); // contiene una lista con los titulos
			/*tambien vale:*/
			//var titles = JSON.parse('' + data);

			console.log('Titles are: ' + titles);

			/*Read HTML template and use callback when it’s loaded*/
			fs.readFile('./index.html', function(err, data) {
				if (err) {
					console.error(err);
					return res.end('Server error');
				}


				var tmpl = data.toString();
				/*Assemble HTML page showing blog titles*/
				var html = tmpl.replace('%', titles.join('</li><li>'));

				console.log('Html is: ' + html);

				res.writeHead(200, {
					'Content-Type': 'text/html'
				});
				res.end(html);
			});
		});
	}
});

var port = 3000;
console.log("Listening port " + port);
server.listen(port, '127.0.0.1');