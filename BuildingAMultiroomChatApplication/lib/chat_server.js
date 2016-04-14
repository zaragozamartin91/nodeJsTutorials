var socketio = require('socket.io');
var io;
var guestNumber = 1;

/*key: connectionId (socket.id) , value: nickname*/
var nickNames = {};
var namesUsed = [];

/*/*key: connectionId (socket.id) , value: current room name*/
var currentRoom = {};


/*The module.exports object is created by the Module system.
The exports variable that is available within a module starts as a reference to module.exports.
CUANDO ALGUIEN CORRA:
	var chatServer = require('./lib/chat_server.js');
	chatServer.listen(server);
SE ESTARA LLAMANDO AL METODO exports.listen DEFINIDO A CONTINUACION
*/
exports.listen = function(server) {
	/*Start Socket.IO server,allowing it to piggyback on existing HTTP server*/
	io = socketio.listen(server);

	io.set('log level', 1);

	/*Define how each user connection will be handled*/
	io.sockets.on('connection', function(socket) {
		/*When a user first connects to the chat server, the user is placedin a chat room named Lobby, and assignGuestName is called to assign 
		them a name to distinguish them from other users.*/

		/*these are helper functions defined later*/
		guestNumber = assignGuestName(socket, guestNumber, nickNames, namesUsed);
		joinRoom(socket, 'Lobby');
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttempts(socket, nickNames, namesUsed);
		handleRoomJoining(socket);

		/*Provide user with list of occupied rooms on request*/
		socket.on('rooms', function() {
			socket.emit('rooms', io.sockets.manager.rooms);
		})

		handleClientDisconnection(socket, nickNames, namesUsed);
	});
};


/*The chat application needs to handle the following types of scenarios and events:
> Guest name assignment
> Room-change requests
> Name-change requests
> Sending chat messages
> Room creation
> User disconnection
*/

/*handles the naming of new users.*/
function assignGuestName(socket, guestNumber, nickNames, namesUsed) {
	var name = 'Guest' + guestNumber;

	/*Associate a client connection ID with a guest name */
	nickNames[socket.id] = name;

	/*Let user know their guest name*/
	socket.emit('nameResult', {
		success: true,
		name: name
	});

	namesUsed.push(name);
	return guestNumber + 1;
}

function joinRoom(socket, room) {
	/*Make user join room*/
	socket.join(room);

	currentRoom[socket.id] = room;

	/*Let user know they’re now in new room*/
	socket.emit('joinResult', {
		room: room
	});

	/*Let other users in room know that user has joined*/
	socket.broadcast.to(room).emit('message', {
		text: nickNames[socket.id] + ' has joined ' + room + '.'
	});

	var usersInRoom = io.sockets.clients(room);
	if (usersInRoom.length > 1) {
		var usersInRoomSummary = 'Users in ' + room + ': ' + usersInRoom.length;
		for (var index in usersInRoom) {
			var userSocketId = usersInRoom[index].id;
			if (userSocketId != socket.id) {
				if (index > 0) {
					usersInRoomSummary += ', ';
				}
				usersInRoomSummary += nickNames[userSocketId];
			}
		}

		usersInRoomSummary += '.';

		/*Send summary of other users in the room to the user*/
		socket.emit('message', {
			text: usersInRoomSummary
		});
	}
}


function handleNameChangeAttempts(socket, nickNames, namesUsed) {
	/*Add listener for nameAttempt events*/
	socket.on('nameAttempt', function(name) {
		if (namesUsed.indexOf(name) == -1) {
			var previousName = nickNames[socket.id];
			var previousNameIndex = namesUsed.indexOf(previousName);
			namesUsed.push(name);
			nickNames[socket.id] = name;

			/*The delete operator removes a property from an object. If the delete operator succeeds, it removes the property from the object entirely. */
			delete namesUsed[previousNameIndex];

			socket.emit('nameResult', {
				success: true,
				name: name
			});
			socket.broadcast.to(currentRoom[socket.id]).emit('message', {
				text: previousName + ' is now known as ' + name
			});
		} else {
			socket.emit('nameResult', {
				success: false,
				message: 'Name ' + name + ' is already in use.'
			});
		}
	});
}


/*the user emits an event indicating the room where the message is to be sent and the
message text. The server then relays the message to all other users in the same room.*/
function handleMessageBroadcasting(socket) {
	/*
	SE ESPERA QUE LA ESTRUCTURA DEL MENSAJE SEA:
	message = {room:'SomeRoom', text:'someText'	}
	 */
	socket.on('message', function(message) {
		/*message event sent by server with JSON data TO ALL BROWSERS!*/
		socket.broadcast.to(message.room).emit('message', {
			text: nickNames[socket.id] + ': ' + message.text
		});
	});
}


function handleRoomJoining(socket) {
	socket.on('join', function(room) {
		socket.leave(currentRoom[socket.id]);
		joinRoom(socket, room.newRoom);
	});
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var nameIndex = namesUsed.indexOf(nickNames[socket.id]);
		delete namesUsed[nameIndex];
		delete nickNames[socket.id];
	});
}