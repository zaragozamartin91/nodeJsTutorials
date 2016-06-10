/*this file simply loads the correct configuration file according to the
process.env.NODE_ENV environment variable*/
module.exports = require('./env/' + process.env.NODE_ENV + '.js');