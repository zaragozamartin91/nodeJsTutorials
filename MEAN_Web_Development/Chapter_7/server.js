/*In the main application file, you connected all the loose ends by requiring
the Express configuration module and then using it to retrieve your application
object instance, and listen to the 3000 port.*/
// ---------------------------------------------------------------------------------

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/*cargo mis configuraciones de mongoose*/
var mongoose = require('./config/mongoose');

/*cargo mis configuraciones de express*/
var express = require('./config/express');

/*cargamos las configuraciones de passport*/
var passport = require('./config/passport');

/*me conecto a la bbdd*/
var db = mongoose();

/*inicio express*/
var app = express();

/*inicio passport*/
var passport = passport();

var port = 3000;
app.listen(port);

module.exports = app;

console.log('Server running at http://localhost:' + port + '/');