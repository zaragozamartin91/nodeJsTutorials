/*DEFINE EL SCHEMA Y REGISTRA EL MODELO DE USUARIO*/
// -----------------------------------------------------------------
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*MongoDB uses collections to store multiple documents, which aren't required
to have the same structure. However, when dealing with objects, it is sometime
necessary for documents to be similar. Mongoose uses a Schema object to define the
document list of properties, each with its own type and constraints, to enforce the
document structure.*/
var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String
});


mongoose.model('User',UserSchema);
/*you defined your UserSchema object using the Schema constructor, and then you used the schema
instance to define your User model.*/