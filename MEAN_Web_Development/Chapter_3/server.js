/*In the main application file, you connected all the loose ends by requiring
the Express configuration module and then using it to retrieve your application
object instance, and listen to the 3000 port.*/

var express = require('./config/express');

var app = express();

var port = 3000;
app.listen(port);

module.exports = app;

console.log('listening on port: ' + port);