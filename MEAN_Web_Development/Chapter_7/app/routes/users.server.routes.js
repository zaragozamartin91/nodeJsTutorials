/*user-related routes that call the controller's methods.*/
// -------------------------------------------------------------

var users = require('../controllers/users.server.controller.js');
var passport = require('passport');

/*UNA ASIGNACION DIRECTA DE module.exports CONVIERTE AL MODULO user.server.routes EN UNA FUNCION.*/
module.exports = function(app) {
    /*al realizar un HTTP POST a /users se invoca al metodo 'create' del controlador para agregar un usuario nuevo.*/
    /*al realizar un HTTP GET a /users se invoca al metodo 'list' del controlador para agregar un usuario nuevo.*/
    app.route('/users')
        .post(users.create)
        .get(users.list);

    /*In Express, adding a colon before a substring in a route definition means
    that this substring will be handled as a request parameter.*/
    app.get('/users/:userId', users.read);

    /*para este PUT es necesario pasar el userId en la URL y los datos del usuario a modificar en el body.*/
    app.put('/users/:userId', users.update);

    app.delete('/users/:userId', users.delete);

    /*the app.param() method that defines a middleware to be executed before any other middleware that uses that parameter. 
    Here, the users.userById() method will be executed before any other middleware registered with the userId parameter, 
    which in this case is the users.read() middleware*/
    app.param('userId', users.userByID);
    /*CADA REQUEST QUE NECESITE EL PARAMETRO userId (COMO LOS GET PUT Y DELETE DE ARRIBA, SE DEBE CORRER EL middleware userByID.*/

    app.get('/users/username/:username', users.read);
    app.param('username', users.userByUsername);


    app.route('/signup')
        .get(users.renderSignup)
        .post(users.signup);

    /*When the passport.authenticate() method is executed, it will try to authenticate
the user request using the strategy defined by its first argument*/
    app.route('/signin')
        .get(users.renderSignin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/signin',
            /*This property tells Passport whether or not to use flash messages*/
            failureFlash: true
        }));

    app.get('/signout', users.signout);
};