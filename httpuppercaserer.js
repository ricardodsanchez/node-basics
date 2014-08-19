// HTTP UPPERCASERER
var http = require('http');
var fs = require('fs');
var map = require('through2-map');
var port = process.argv[2];

var server = http.createServer(function(req, res){
	req.on('data', function(data){
		data = String(data).toUpperCase();
		res.write(data);
		res.setTimeout(1000, function(){
			res.end();
		});
	});
});

server.listen(Number(port));