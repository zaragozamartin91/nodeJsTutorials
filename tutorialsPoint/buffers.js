/*Node provides Buffer class which provides instances to store raw data similar to an array of integers but corresponds to a raw memory allocation outside the V8 heap.
Buffer class is a global class and can be accessed in application without importing buffer module*/

var bufSize = 10;
var buf1 = new Buffer(bufSize);

var buf2 = new Buffer([1, 2, 3, 4, 5]);

var buf3 = new Buffer("This is an utf-8 buffer", "utf-8");

console.log(buf1);
console.log(buf2);
console.log(buf3);


var buf4 = new Buffer(256);
var len = buf4.write("Simple easy learning");
console.log(buf4.toString());

var toWrite = " more data is written!";
buf4.write(toWrite, len, toWrite.length, "utf-8");
console.log(buf4.toString('utf-8'));


var buf5 = new Buffer("Este es un texto normal","utf-8");
var json = buf5.toJSON();
console.log(json);