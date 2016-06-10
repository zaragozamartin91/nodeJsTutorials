/*Users controller that will handle all user-related operations.*/
// -------------------------------------------------------------------

/*pido el modelo User que fue registrado en config/mongoose.js*/
var User = require('mongoose').model('User');

/*controller method named create(), which you will later use to create new users*/
exports.create = function(req, res, next) {
    console.log("request body: ");
    console.log(req.body);

    /*Using the new keyword, the create() method creates a new model instance, which
    is populated using the request body*/
    var user = new User(req.body);
    console.log("new user:");
    console.log(user);

    /*guardo el usuario en la bbdd*/
    user.save(function(err) {
        if (err) {
            /*si ocurrio un error llamo al proximo middleware pasandole el error*/
            return next(err);
        }

        res.json(user);
    });
};