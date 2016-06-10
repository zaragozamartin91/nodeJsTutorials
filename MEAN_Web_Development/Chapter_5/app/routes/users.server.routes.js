/*user-related routes that call the controller's methods.*/
// -------------------------------------------------------------

var users = require('../controllers/users.server.controller.js');

module.exports = function(app) {
    /*al realizar un HTTP POST a /users se invoca al metodo 'create' del controlador para agregar un usuario nuevo.*/
    app.route('/users').post(users.create);
};