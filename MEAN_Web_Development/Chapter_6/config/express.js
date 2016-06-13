/*The express.js file is where we configure our Express application. This
is where we add everything related to the Express configuration.*/
// ----------------------------------------------------------------------------------------------------------------

/* 
morgan module provides a simple logger middleware, 
compression module will provides response compression, 
body-parser module provides several middleware to handle request data, 
method-override module provides DELETE and PUT HTTP verbs legacy support
express-session module will use a cookie-stored, signed identifier to identify the current user.
*/

var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    flash = require('connect-flash');


module.exports = function() {
    var app = express();

    /*leo la variable de ambiente NODE_ENV para determinar ciertas caracteristicas de la app.*/
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    /*We simply used the app.use() method to load the morgan() middleware in a development environment
    and the compress() middleware in a production environment.*/

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    /*The bodyParser.urlencoded(), bodyParser.json(), and methodOverride() middleware will
    always load, regardless of the environment.*/


    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    /*In this configuration object, the secret property is defined using
    the configuration file you previously modified. The session middleware adds a
    session object to all request objects in your application. Using this session object,
    you can set or get any property that you wish to use in the current session*/


    /*Notice how we use the app.set() method to configure the Express application
    views folder and template engine*/
    app.set('views', './app/views');
    /*EJS views basically consist of HTML code mixed with EJS tags. EJS templates will
    reside in the app/views folder and will have the .ejs extension. When you'll use the
    res.render() method, the EJS engine will look for the template in the views folder*/
    app.set('view engine', 'ejs');
    
    
    /*The Connect-Flash module is a node module that allows you to store temporary messages in an area of the session object 
    called flash. Messages stored on the flash object will be cleared once they are presented to the user. This architecture makes the
    Connect-Flash module perfect to transfer messages before redirecting the request to another page.*/
    app.use(flash());


    /*register the Passport middleware in your Express application*/
    /*the passport.initialize() middleware, which is responsible for bootstrapping the Passport module and the 
    passport.session() middleware, which is using the Express session to keep track of your user's session*/
    app.use(passport.initialize());
    app.use(passport.session());

    /*configuramos las rutas de redireccion o 'routing' para index y para usuarios*/
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);

    /*In any web application, there is always a need to serve static files. Fortunately,
    Express comes prebundled with the express.static() middleware, which provides this feature.*/
    app.use(express.static('./public'));
    /*The express.static() middleware takes one argument to determine the location of
    the static folder.
    IMPORTANT!!!: Notice how the express.static() middleware is placed below the
    call for the routing file. This order matters because if it were above it, Express would
    first try to look for HTTP request paths in the static files folder. This would make the
    response a lot slower as it would have to wait for a filesystem I/O operation.*/

    return app;
};