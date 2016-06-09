var fs = require('fs');
var zlib = require('zlib');

exports.decompress = function(org, dst) {
    fs.createReadStream(org)
        .pipe(zlib.createGunzip())
        .pipe(fs.createWriteStream(dst));

    console.log("File " + org + " decompressed to " + dst);
}