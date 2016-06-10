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
    username: {
        type: String,
        /*the trim property added to the username field. This will make sure your username data will be kept trimmed.*/
        trim: true
    },
    password: String,
    /*The created date field should be initialized at creation time and save the time the user document
    was initially created*/
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        /*you can also define your own custom setter modifiers to handle data manipulation before saving the document*/
        set: function(url) {
            if (url && url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                return 'http://' + url;
            }
            return url;
        },
        /*Getter modifiers are used to modify existing data before outputting the documents to next layer.*/
        get: function(url) {
            url = url || "DEFAULT";
            if (url && url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                return 'http://' + url;
            }
            return url;
        }
    }
});

/*This will force Mongoose to include getters when
converting the MongoDB document to a JSON representation and will allow the
output of documents using res.json()*/
UserSchema.set('toJSON', { getters: true });

mongoose.model('User', UserSchema);
/*you defined your UserSchema object using the Schema constructor, and then you used the schema
instance to define your User model.*/