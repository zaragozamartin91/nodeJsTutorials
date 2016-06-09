var connect = require('connect');

/*inicia el framework connect*/
var app = connect();

var logger = function(req, res, next) {
    console.log(req.method + "#" + req.url);
    /*next contains a callback with the next middleware to be executed...*/
    next();
};

/*req: This is an object that holds the HTTP request information 
res: This is an object that holds the HTTP response information and allows you to set the response properties 
next: This is the next middleware function defined in the ordered set of Connect middleware*/
var helloWorld = function(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.end('Hello World!');
};

var goodbyeWorld = function(req, res, next) {
    res.setHeader('content-type', 'text/plain');
    res.end('Goodbye')
};

/*register as many middleware functions as you want. Using the app.use() method, you'll be able to set a series of middleware functions
 that will be executed in a row to achieve maximum flexibility when writing your application. 
 Connect will then pass the next middleware function to the currently executing middleware function using the next argument. 
 In each middleware function, you can decide whether to call the next middleware function or stop at the current one. 
 Notice that each Connect middleware function will be executed in first-in-first-out (FIFO) order using thenext arguments until there
  are no more middleware functions to execute or the next middleware function is not called.*/
app.use(logger);
/*Connect middleware supports a feature called mounting, which enables you to determine which request path is required for the 
middleware function to get executed. Mounting is done by adding the path argument to the app.use() method.*/
app.use('/helloWorld', helloWorld);
app.use('/goodbyeWorld', goodbyeWorld);


/*First, you added a middleware function named helloWorld(), which has three arguments: req, res, and next. 
In your middleware, you used the res.setHeader()method to set the response Content-Type header and the res.end() method to set the response text. 
Finally, you used the app.use() method to register your middleware with the Connect application.*/
var port = 3000;
app.listen(port);

console.log("server running at " + port);