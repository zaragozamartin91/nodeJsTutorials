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
    email: {
        type: String,
        /*Mongoose supports the creation of secondary indexes using the index property*/
        index: true,
        /*The usage of a match validator here will make sure the email field value matches the given regex expression*/
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        /*the trim property added to the username field. This will make sure your username data will be kept trimmed.*/
        trim: true,
        /*This will tell MongoDB to create a unique index for the username field of the users collections.*/
        unique: true,
        /*To validate field existence in Mongoose, you'll need to use the required property in the field you want to validate*/
        required: true
    },
    role: {
        type: String,
        /*the enum validator, which can help you define a set of strings that are available for that field value*/
        enum: ['Admin', 'Owner', 'User']
    },
    password: {
        type: String,
        /*Defining a custom validator is done using the validate property. The validate property value should be an array consisting of 
        a validation function and an error message.*/
        validate: [
            function(password) {
                return password.length >= 6;
            },
            'Password should be longer...'
        ]
    },
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

/*fullName sera un virtual field de forma tal que al pedirlo, se calculara a partir de los campos firstName y lastName.*/
/*se agrega tambien un setter para fullName de forma tal de modificar al mismo tiempo first y last.*/
UserSchema.virtual('fullName').get(function() {
    return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
    var split = fullName.split(' ');
    this.firstName = split[0] || '';
    this.lastName = split[1] || '';
});

/*To add a static method, you will need to declare it as a member of your schema's statics property*/
UserSchema.statics.findOneByUsername = function(username, callback) {
    this.findOne({
        /*'i' is to Perform case-insensitive matching*/
        username: new RegExp(username, 'i')
    }, callback);
};

/*To add an instance method, you will need to declare it as a member of your schema's methods property*/
UserSchema.methods.authenticate = function(password) {
    return this.password === password;
};

/*A post middleware is defined using the post() method of the schema object*/
/*esta funcion correra despues de ejecutar save() sobre mongo.*/
UserSchema.post('save', function(next){
    if(this.isNew){
        console.log('A new user was created!');
    } else {
        console.log('An user was updated!');
    }
})

/*This will force Mongoose to include getters when converting the MongoDB document to a JSON representation and will allow the
output of documents using res.json(). Tambien habilita los campos virtuales como fullName.*/
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

mongoose.model('User', UserSchema);
/*you defined your UserSchema object using the Schema constructor, and then you used the schema
instance to define your User model.*/