/*Chanining is a mechanism to connect output of one stream to another stream and create a chain of 
multiple stream operations. It is normally used with piping operations. */

var fs = require('fs');
var zlib = require('zlib');

var writeStream = fs.createWriteStream('input.txt.gz');

fs.createReadStream('input.txt')
    .pipe(zlib.createGzip())
    .pipe(writeStream);

var decompressor = require('./decompressor.js');

writeStream.on('finish', function() {
    console.log("input.txt compressed to input.txt.gz");
    decompressor.decompress('input.txt.gz', 'input.txt')
});