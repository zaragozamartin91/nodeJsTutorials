var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(req,res){
    var path = url.parse(req.url).pathname;

    console.log("request: " + path);

    var resource = path.split("/")[1].split(".")[0];
    console.log("getting resource: " + resource);

    var filePath = resource + ".htm";

    fs.readFile(filePath, function(err,data){
        if(err){
            console.error(err.stack);

            res.writeHead(404,{'content-type':'text/html'});
        } else {
            res.writeHead(200,{'content-type':'text/html'});
            res.write(data.toString());
        }

        res.end();
    });    
});

server.listen(8080);

console.log("Server running at: http://localhost:8080/");