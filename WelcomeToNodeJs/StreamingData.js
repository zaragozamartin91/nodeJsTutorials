var fs = require('fs');

var stream = fs.createReadStream('./resource.json');

//A data event is fired whenever a new chunk of data is ready
stream.on('data', function(chunk) {
	console.log(''+chunk);
});

//an end event is fired when all the chunks have been loaded
stream.on('end', function() {
	console.log("ENDED!");
})