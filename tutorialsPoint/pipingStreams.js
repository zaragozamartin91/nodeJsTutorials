var fs = require('fs');

var readStream = fs.createReadStream('input.txt');

var writeStream = fs.createWriteStream('piped.txt');

// Pipe the read and write operations
// read input.txt and write data to piped.txt
readStream.pipe(writeStream);

readStream.on('data', function(chunk) {
    console.log("read: " + chunk);
});

writeStream.on('finish', function() {
    console.log("write finished");
});

console.log("Program end!");