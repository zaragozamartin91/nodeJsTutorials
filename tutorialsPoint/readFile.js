var fs = require('fs');

var path = 'input.txt';
fs.readFile(path,function(err,data){
    if(err) {
        console.error("Something went wrong: " + err.stack);
    }

    console.log("Async read: " + data);
});


var contents = fs.readFileSync(path);
console.log("contents sync read: " + contents);

console.log("Program end!");