/*DEFINE EL CONTROLADOR PARA index*/
//------------------------------------------------------------

/*UNA ASIGNACION exports.render EXPONE LA FUNCION render EN EL OBJETO DEL MODULO:
require('./module').render()*/
exports.render = function(req, res) {
    /*The controller checks whether the lastVisit property was set in the session object, and if so,
    outputs the last visit date to the console. It then sets the lastVisit property to
    the current time.*/
    if (req.session.lastVisit) {
        console.log("last visit: " + req.session.lastVisit);
    }
    req.session.lastVisit = new Date();

    /*This will render the user object as a JSON representation right in your main view application.*/
    res.render('index', {
        title: 'Hello World',
        user: JSON.stringify(req.user)
    });
};