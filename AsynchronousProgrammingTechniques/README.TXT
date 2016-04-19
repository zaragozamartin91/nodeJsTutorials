The Node convention for asynchronous callbacks
----------------------------------------------
Most Node built-in modules use callbacks with two arguments: the first argument is
for an error, should one occur, and the second argument is for the results. The error
argument is often abbreviated as er or err.
Here’s a typical example of this common function signature:
var fs = require('fs');
fs.readFile('./titles.json', function(er, data) {
if (er) throw er;
// do something with data if no error has occurred
});