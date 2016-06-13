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

    /*The first argument is the name of your EJS template without the .ejs extension, and the second argument is an
    object containing your template variables. The res.render() method will use the EJS template engine to look for 
    the file in the views folder that we set in the config/express.js file and will then render the view using the template variables*/
    res.render('index', {
        title: 'Hello World',
        userFullName: req.user ? req.user.fullName : ''
    });
    /*ANTERIOR CODIGO BUSCA app/views/index.ejs Y LE SETEA LA VARIABLE title='Hello World' */
};