/*If you’d like to build upon the event emitter’s behavior, you can create a new JavaScript class that inherits from the event emitter. For example, you could create a
class called Watcher that would process files placed in a specified filesystem directory. You’d then use this class to create a utility that would watch a filesystem directory
(renaming any files placed in it to lowercase) and then copy the files into a separate directory.*/
var events = require('events');
var util = require('util');

var fs = require('fs');

var watchDir = './watch';
var processedDir = './done';

function Watcher(watchDir, processedDir) {
	this.watchDir = watchDir;
	this.processedDir = processedDir;
}

/*Note the use of the inherits function, which is part of Node’s built-in util module.
The inherits function provides a clean way to inherit another object’s behavior.*/
util.inherits(Watcher, events.EventEmitter);



/*Extend EventEmitter with method that processes files*/
Watcher.prototype.watch = function() {
	var watcher = this;

	/*Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files 
	in the directory excluding '.' and '..'*/
	fs.readdir(this.watchDir, function(err, files) {
		if (err) throw err;

		/*Process each file in watch directory*/
		files.forEach(function(file) {
			watcher.emit('process', file);
		});
	});
};


Wathcer.prototype.start = function() {
	var watcher = this;
	/*Watch for changes on filename. The callback listener will be called each time the file is accessed*/
	fs.watchFile(watchDir, function() {
		watcher.watch();
	})
};