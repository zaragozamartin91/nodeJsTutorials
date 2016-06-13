/*CARGA LAS CONFIGURACIONES DE MONGOOSE.
CARGA LOS SCHEMAS Y MODELOS
SE CONECTA A LA BBDD*/
// ----------------------------------------------------------------------

var config = require('./config'),
    mongoose = require('mongoose');

/*config carga las variables de configuracion apropiadas de acuerdo al ambiente (por ejemplo, si NODE_ENV es 'development',
entonces carga configs de ./env/development.js). config.db tiene la url de la bbdd.*/

module.exports = function() {
    var db = mongoose.connect(config.db);

    require('../app/models/user.server.model.js');

    return db;
};