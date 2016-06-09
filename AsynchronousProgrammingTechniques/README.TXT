The Node convention for asynchronous callbacks
----------------------------------------------
Most Node built-in modules use callbacks with two arguments: the first argument is
for an error, should one occur, and the second argument is for the results. The error
argument is often abbreviated as er or err.
Here’s a typical example of this common function signature:
var fs = require('fs');
fs.readFile('./titles.json', function(er, data) {
if (er) throw er;
// do something with data if no error has occurred
});


Error handling
--------------
A convention you can use when creating event emitters is to emit an error type event
instead of directly throwing an error. This allows you to define custom event response
logic by setting one or more listeners for this event type.
The following code shows how an error listener handles an emitted error by logging
into the console:
var events = require('events');
var myEmitter = new events.EventEmitter();
myEmitter.on('error', function(err) {
console.log('ERROR: ' + err.message);
});
myEmitter.emit('error', new Error('Something is wrong.'));
If no listener for this event type is defined when the error event type is emitted, the
event emitter will output a stack trace (a list of program instructions that had executed
up to the point when the error occurred) and halt execution. The stack trace will
indicate an error of the type specified by the emit call’s second argument. This
behavior is unique to error type events; when other event types are emitted, and
they have no listeners, nothing happens.
If an error type event is emitted without an error object supplied as the second
argument, a stack trace will indicate an “Uncaught, unspecified ‘error’ event” error,
and your application will halt. There is a deprecated method you can use to deal with
this error—you can define your own response by defining a global handler using the
following code:
process.on('uncaughtException', function(err){
console.error(err.stack);
process.exit(1);
});
Alternatives to this, such as domains (http://nodejs.org/api/domain.html), are being
developed, but they’re considered experimental.