var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {}; // key: clientId , value: clientSocket
channel.subscriptions = {};
channel.setMaxListeners(50);

channel.on('join', function(id, client) {
	/*Add a listener for the join event that stores a user’s client object, allowing the
	application to send data back to the user.*/
	this.clients[id] = client;

	client.write('Welcome! clients online: ' + this.listeners('broadcast').length);

	this.subscriptions[id] = function(senderId, message) {
		/*Ignore data if it’s been directly broadcast by the user*/
		if (id != senderId) {
			this.clients[id].write(message);
		}
	};

	/*Add a listener, specific to the current user, for the broadcast event.*/
	this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
	/*Remove broadcast listener for specific client*/
	this.removeListener('broadcast', this.subscriptions[id]);
	this.emit('broadcast', 'client ' + id + ' left the conversation');
});

channel.on('shutdown', function() {
	this.emit('broadcast', 'closing all');
	this.removeAllListeners('broadcast');
});

// client es un socket de cliente nuevo
var server = net.createServer(function(client) {
	var id = client.remoteAddress + ":" + client.remotePort;

	/*Emit a join event when a user connects to the server, specifying the user ID and client object.*/
	client.on('connect', function() {
		channel.emit('join', id, client);
		console.log("client " + id + " joined!");
	});

	/*Emit a channel broadcast event, specifying the user ID and message, when any user sends data.*/
	client.on('data', function(data) {
		data = data.toString();

		if (data == 'shutdown' || data == 'shutdown\r\n') {
			channel.emit('shutdown');
			return;
		}

		channel.emit('broadcast', id, data);
		console.log("client " + id + " sent: " + data);
	});

	/*Emit leave event when client disconnects*/
	client.on('close', function() {
		channel.emit('leave', id);
	});
});

var port = 3000;
console.log("listening port " + port);
server.listen(port);