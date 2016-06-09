var fs = require('fs');
var data = "This is some\ndata to write to\na certain file.";

var writeStream = fs.createWriteStream('output.txt');

writeStream.write(data,'utf-8');
writeStream.end();

writeStream.on('finish',function(){
    console.log("Write ended!");
});
