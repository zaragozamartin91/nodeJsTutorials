//Example POST method invocation 
var Client = require('node-rest-client').Client;

var client = new Client();

// set content-type header and data as json in args parameter 
var args = {
    data: {
        firstName: "Mateo",
        lastName: "Zaragoza",
        email: "mateo@zaragoza.com",
        username: "mateoz",
        password: "123456",
        website: "zaragozamartin.com.ar",
        role: 'Admin'
    },
    headers: {
        "Content-Type": "application/json"
    }
};

// registering remote methods 
client.registerMethod("postMethod", "http://localhost:3000/users", "POST");

client.methods.postMethod(args, function(data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});