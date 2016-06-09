var fs = require('fs');
var data = '';

/*Streams are objects that let you read data from a source or write data to a destination in continous fashion. In Node.js, there are four types of streams.
Readable - Stream which is used for read operation.
Writable - Stream which is used for write operation.
Duplex - Stream which can be used for both read and write operation.
Transform - A type of duplex stream where the output is computed based on input.*/
var readStream = fs.createReadStream("input.txt");
readStream.setEncoding('utf-8');

/*Each type of Stream is an EventEmitter instance and throws several events at different instance of times. For example, some of the commonly used events are:
data - This event is fired when there is data is available to read.
end - This event is fired when there is no more data to read.
error - This event is fired when there is any error receiving or writing data.
finish - This event is fired when all data has been flushed to underlying system*/
readStream.on('data', function(chunk) {
    console.log("received: " + chunk);
    data += chunk;
});

readStream.on('end',function(){
    console.log("stream read end!");
    console.log("data is: " + data);
});

readStream.on('error',function(err){
    console.error("An error occurred:");
    console.error(err);
});