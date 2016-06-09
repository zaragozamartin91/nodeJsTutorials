var connect = require('connect');

/*inicia el framework connect*/
var app = connect();

/*req: This is an object that holds the HTTP request information 
res: This is an object that holds the HTTP response information and allows you to set the response properties 
next: This is the next middleware function defined in the ordered set of Connect middleware*/
var helloWorld = function(req,res,next) {
    res.setHeader('content-type','text/plain');
    res.end('Hello World!');
};

/*When you have a middleware defined, you'll just have to register it with the Connect application using the app.use() method.*/
app.use(helloWorld);


/*First, you added a middleware function named helloWorld(), which has three arguments: req, res, and next. 
In your middleware, you used the res.setHeader()method to set the response Content-Type header and the res.end() method to set the response text. 
Finally, you used the app.use() method to register your middleware with the Connect application.*/
var port = 3000;
app.listen(port);

console.log("server running at " + port);