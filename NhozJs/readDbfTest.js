var Parser = require('node-dbf');

var parser = new Parser('./LISTAPRE.dbf');

parser.on('start', function(p) {
    console.log('dBase file parsing has started');
});

parser.on('header', function(header) {
    console.log('dBase file header has been parsed');
    console.log(header);
});

parser.on('record', function(record) {
    console.log("Record parsed:");
    console.log(record);
});

parser.on('end', function(p) {
    console.log('Finished parsing the dBase file');
});

parser.parse();