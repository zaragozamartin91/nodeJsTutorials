/*The following code defines a channel event emitter with a single listener that
responds to someone joining the channel. Note that you use on (or, alternatively, the
longer form addListener) to add a listener to an event emitter:*/
var EventEmitter = require('events').EventEmitter;
var channel = new EventEmitter();

channel.on('join',function(){
	console.log('Welcome!');
});

/*This join callback, however, won’t ever be called, because you haven’t emitted any
events yet. You could add a line to the listing that would trigger an event using the
emit function:*/
channel.emit('join');
