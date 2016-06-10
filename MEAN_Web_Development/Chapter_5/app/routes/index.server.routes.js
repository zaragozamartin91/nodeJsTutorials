/*first, you used the CommonJS module pattern again. As
you may recall the CommonJS module pattern supports both the exporting of several
functions like you did with your controller and the use of a single module function
like you did here. Next, you required your index controller and used its render()
method as a middleware to GET requests made to the root path.*/
module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
};