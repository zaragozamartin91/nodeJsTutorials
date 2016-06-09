/*The express.js file is where we configure our Express application. This
is where we add everything related to the Express configuration.*/

var express = require('express');

/*In the preceding code snippet, you required the Express module then used the
CommonJS module pattern to define a module function that initializes the Express
application. First, it creates a new instance of an Express application, and then it
requires your routing file and calls it as a function passing it the application instance
as an argument.*/
module.exports = function() {
    var app = express();
    require('../app/routes/index.server.routes.js')(app);
    return app;
};