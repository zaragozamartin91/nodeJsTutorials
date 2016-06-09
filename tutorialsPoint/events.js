var events = require('events');
var EventEmitter = events.EventEmitter;

var eventEmitter = new EventEmitter();

var listener1 = function() {
    console.log("listener1 ok");
}

var listener2 = function() {
    console.log("listener2 ok");
}

/*listeners can be added with 'addListener' or 'on'*/
eventEmitter.addListener('connection', listener1);
eventEmitter.on('connection', listener2);

var listenerCount = EventEmitter.listenerCount(eventEmitter, 'connection');
console.log("listenerCount is: " + listenerCount);

eventEmitter.emit('connection');

/*removes a specific listener args are:'type',listener*/
eventEmitter.removeListener('connection', listener1);
console.log('listener1 removed');
eventEmitter.emit('connection');

listenerCount = EventEmitter.listenerCount(eventEmitter, 'connection');
console.log("listenerCount is: " + listenerCount);