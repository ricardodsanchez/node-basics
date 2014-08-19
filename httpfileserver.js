// HTTP FILE SERVER
var http = require('http');
var fs = require('fs');

var server = http.createServer(function(request, response){
	var file = process.argv[3];
	var readStream = fs.createReadStream(file);
	readStream.on('open', function(){
		readStream.pipe(response);
	});
	readStream.on('error', function(err){
		response.end(err)
	})
})

server.listen(Number(process.argv[2]))