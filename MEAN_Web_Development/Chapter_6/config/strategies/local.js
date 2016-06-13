/*CONTIENE LA CONFIGURACION DE LA ESTRATEGIA LOCAL DE AUTENTICACION DE PASSPORT*/
// -------------------------------------------------------------------------------------------------------------------------------
// 

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');


module.exports = function() {
    /*the LocalStrategy constructor takes a callback function as an argument. It will later call this callback when trying to
    authenticate a user.*/
    passport.use(new LocalStrategy(function(username, password, done) {
        /*The callback function accepts three arguments—username, password, and a done
        callback—which will be called when the authentication process is over*/
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {
                    message: 'Unknown user'
                });
            }

            if (!user.authenticate(password)) {
                return done(null, false, {
                    message: 'Invalid pass'
                });
            }

            /*When the user is authenticated, you will call the done callback with the user Mongoose object*/
            return done(null, user);
        });
    }));
};