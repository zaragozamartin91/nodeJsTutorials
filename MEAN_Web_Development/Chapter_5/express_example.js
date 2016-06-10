var express = require('express');

var app = express();

/*Express wraps the Connect module in several ways. The app.use() method is used to mount a middleware function, which will respond
 to any HTTP request made to the root path. Inside the middleware function, theres.send() method is then used to send the response back.*/
app.use('/', function(req, res) {
    /*The res.send() method is basically an Express wrapper that sets the Content-Type header according to theresponse object type and then sends
     a response back using the Connect res.end()method.*/
    res.send('Hello world');
    /*When passing a buffer to the res.send() method, the Content-Type header will be set to application/octet-stream. 
    When passing a string, it will be set totext/html and when passing an object or an array, it will be set toapplication/json.*/
});

var port = 3000;
app.listen(port);

console.log("listening at port: " + port);

module.exports = app;