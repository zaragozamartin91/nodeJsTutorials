/*Users controller that will handle all user-related operations.*/
// -------------------------------------------------------------------

/*pido el modelo User que fue registrado en config/mongoose.js. User es una clase de modelo.*/
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

        /*responds as JSON. res.json() will also convert non-objects, such as null and undefined, which are not valid JSON*/
        res.json(user);
    });
};

/*metodo de controlador que listara a todos los usuarios*/
exports.list = function(req, res, next) {
    /*realiza una query para encontrar a todos los usuarios (igual a db.users.find() )*/
    User.find({}, function(err, users) {
        if (err) {
            /*si ocurrio un error llamo al proximo middleware pasandole el error*/
            console.error("something went wrong!");
            return next(err);
        }

        /*responds as JSON. res.json() will also convert non-objects, such as null and undefined, which are not valid JSON*/
        res.json(users);
    });
};


/*The read() method is simple to understand; it is just responding with a JSON representation of the req.user object, but what is creating 
the req.user object? Well, the userById() method is the one responsible for populating the req.user object. You will use the userById() method 
as a middleware to deal with the manipulation of single documents when performing read, delete, and updateoperations.*/
exports.read = function(req, res) {
    res.json(req.user);
};
exports.userByID = function(req, res, next, id) {
    User.findOne({
        _id: id
    }, function(err, user) {
        if (err) {
            return next(err);
        }

        req.user = user;
        next();
    });
};


/*since we already use the userById() middleware, the easiest way to update an existing document would be to use the findByIdAndUpdate() method*/
exports.update = function(req, res, next) {
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
        if (err) {
            return next(err);
        }

        res.json(user);
    });
};


exports.delete = function(req, res, next) {
    /*you use the user object to remove the correct document*/
    req.user.remove(function(err) {
        if (err) {
            return next(err);
        }

        res.json(req.user);
    });
}