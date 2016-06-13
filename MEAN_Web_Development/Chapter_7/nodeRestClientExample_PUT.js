//Example POST method invocation 
var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// set content-type header and data as json in args parameter 
var args = {
    data: {firstName:"MARTIN", lastName:"ZARAGOZA",email:"user@example.com",username:"mzaragoza",password:"password"},
    headers: { "Content-Type": "application/json" }
};
 
// registering remote methods 
client.registerMethod("postMethod", "http://localhost:3000/users/575ad9cced16cda03250d2a1", "PUT");
 
client.methods.postMethod(args, function (data, response) {
    // parsed response body as js object 
    console.log(data);
    // raw response 
    console.log(response);
});