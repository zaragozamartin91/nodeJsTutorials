var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send('GET REQUEST!');
});

app.post('/', function(req, res) {
    res.send('POST REQUEST!');
});

var hasName = function(req, res, next) {
    if (req.param('name')) {
        /*next contains the next middleware function*/
        next();
    } else {
        res.send('what is your name?');
    }
};

var sayHello = function(req, res) {
    var name = req.param('name');
    res.send("hello, " + name);
};

/*In the preceding code, there are two middleware functions named hasName() and
sayHello(). The hasName() middleware is looking for the name parameter; if it finds
a defined name parameter, it will call the next middleware function using the next
argument. Otherwise, the hasName() middleware will handle the response by itself.
In this case, the next middleware function would be the sayHello() middleware
function. This is possible because we've added the middleware function in a row using
the app.get() method.*/
app.get('/name', hasName, sayHello);

app.listen(3000);
console.log("listening on port: " + 3000);