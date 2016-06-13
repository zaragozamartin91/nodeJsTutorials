/*Users controller that will handle all user-related operations.*/
// -------------------------------------------------------------------

/*pido el modelo User que fue registrado en config/mongoose.js. User es una clase de modelo.*/
var User = require('mongoose').model('User');
var passport = require('passport');

/*returns a unified error message from a Mongoose error object.*/
var getErrorMessage = function(err) {
    var message = '';
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                message = 'Username already exists';
                break;
            default:
                message = 'Something went wrong';
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) message = err.errors[errName].message;
        }
    }
    return message;
};


/*flash ES UN OBJETO EL CUAL SIRVE PARA PASAR/OBTENER INFORMACION HACIA/DESDE REDIRECTS.
PARA PODER USAR FLASH, SE DEBE USAR EL MODULO Connect-flash EL CUALE EXPONE EL METODO flash PARA requests.*/
exports.renderSignin = function(req, res, next) {
    if (!req.user) {
        res.render('signin', {
            title: 'Sign-in Form',
            /*The messages variable uses req.flash() to read the messages written to the flash.*/
            messages: req.flash('error') || req.flash('info')
        });
    } else {
        return res.redirect('/');
    }
};


exports.renderSignup = function(req, res, next) {
    if (!req.user) {
        res.render('signup', {
            title: 'Sign-up Form',
            messages: req.flash('error')
        });
    } else {
        return res.redirect('/');
    }
};


exports.signup = function(req, res, next) {
    if (!req.user) {
        /*first creates a user object from the HTTP request body*/
        var user = new User(req.body);
        var message = null;
        user.provider = 'local';

        /*try saving it to MongoDB. If an error occurs, the signup() method will use the getErrorMessage()
        method to provide the user with an appropriate error message*/
        user.save(function(err) {
            if (err) {
                var message = getErrorMessage(err);
                /*This is how error messages are written to the flash, again using the req.flash() method.*/
                req.flash('error', message);
                return res.redirect('/signup');
            }

            /*If the user creation was successful, the user session will be created using the req.login() method. The
            req.login() method is exposed by the Passport module and is used to establish a successful login session.*/
            req.login(user, function(err) {
                if (err) return next(err);
                return res.redirect('/');
            });
        });
    } else {
        return res.redirect('/');
    }
};


exports.signout = function(req, res) {
    /*the req.logout() method, which is provided by the Passport module to invalidate the authenticated session.*/
    req.logout();
    res.redirect('/');
};


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
};


exports.userByUsername = function(req, res, next, username) {
    /*findOneByUsername es una funcion ESTATICA de UserSchema definida en users.server.controller*/
    User.findOneByUsername(username, function(err, user) {
        if (err) {
            return next(err);
        }

        req.user = user;
        next();
    });
};