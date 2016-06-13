/*CONFIGURACION GENERAL DE PASSPORT*/
// -------------------------------------------------------------------------------------------------------------
// 

var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function() {
    var User = mongoose.model('User');


    /*the passport.serializeUser() and passport.deserializeUser() methods are used to define how Passport will handle user
    serialization*/


    console.log("running ./config/passport!");


    passport.serializeUser(function(user, done) {
        console.log("user: ");
        console.log(user);
        /*When a user is authenticated, Passport will save its _id property to the session.*/
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        /*Later on when the user object is needed, Passport will use the _id property to grab the user object from the database*/
        User.findOne({
            _id: id
        }, '-password -salt', function(err, user) {
            done(err, user);
        });
        /*we used the field options
        argument to make sure Mongoose doesn't fetch the user's password and salt
        properties.*/
    });


    /*ejecuto inmediatamente las configuraciones de la estrategia local de passport*/
    require('./strategies/local.js')();
};