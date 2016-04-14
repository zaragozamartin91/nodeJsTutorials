function divEscapedContentElement(message) {
	/*retorna un nuevo elemento de tipo <div> cuyo TEXTO sera el mensaje.
	Si el contenido del mensaje es de tipo HTML, sus caracteres seran escapeados.*/
	return $('<div></div>').text(message);
}

function divSystemContentElement(message) {
	/*retorna un nuevo elemento de tipo <div> y establece el contenido HTML del mismo
	con la informacion del mensaje.*/
	return $('<div></div>').html('<i>' + message + '</i>');
}

/*The next function is for processing user input. If user input begins with the slash (/) character, it’s treated as a chat command. 
If not, it’s sent to the server as a chat message to be broadcast to other users, and it’s added to the chat room text of the room the user’s 
currently in.*/
function processUserInput(chatApp, socket) {
	/*obtenemos el valor del <input> cuyo id es 'send-message'*/
	var message = $('#send-message').val();

	var systemMessage;

	/*If user input begins with slash, treat it as command*/
	if (message.charAt(0) == '/') {
		systemMessage = chatApp.processCommand(message);
		if (systemMessage) {
			$('#messages').append(divSystemContentElement(systemMessage));
		}
	} else {
		/*Broadcast noncommand input to other users*/
		var room = $('#room').text();
		chatApp.sendMessage(room, message);
		$('#messages').append(divEscapedContentElement(message));
		$('#messages').scrollTop($('#messages').prop('scrollHeight'));
	}

	$('#send-message').val('');
}


/*we to add the logic in the following listing, which is meant to execute when the web page has fully loaded in the
user’s browser. This code handles client-side initiation of Socket.IO event handling.*/
var socket = io.connect();

$(document).ready(function() {
	var chatApp = new Chat(socket);


	socket.on('nameResult', function(result) {
		var message;

		if (result.success) {
			message = 'You are now known as ' + result.name;
		} else {
			message = result.message;
		}
		$('#messages').append(divSystemContentElement(message));
	});

	socket.on('joinResult', function(result) {
		$('#room').text(result.room);
		$('#messages').append(divSystemContentElement('Room changed!'));
	});

	socket.on('message', function(message) {
		var newElement = $('<div></div>').text(message.text);
		$('#messages').append(newElement);
	});

	/*Display list of rooms available*/
	socket.on('rooms', function(rooms) {
		$('#room-list').empty();
		for (var room in rooms) {
			room = room.substring(1, room.length);
			if (room != '') {
				$('#room-list').append(divEscapedContentElement(room));
			}
		}

		/*Allow click of a room name to change to that room*/
		$('#room-list div').click(function() {
			chatApp.processCommand('/join ' + $(this).text());
			$('#send-message').focus();
		});
	});

	/*Request list of rooms available intermittently*/
	setInterval(function() {
		socket.emit('rooms');
	}, 1000);
	$('#send-message').focus();
	$('#send-form').submit(function() {
		processUserInput(chatApp, socket);
		return false;
	});

});