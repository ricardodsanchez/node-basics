// HELLO WORLD
// console.log("HELLO WORLD");

// BABY STEPS
// add the numbers passed as arguments and return the sum of them
// note: it starts at index 2 as the first two array values are 'node' and then the path to your program
// var sum = 0;

// for(var i = 2; i <= process.argv.length -1; i++){
// 	sum += +process.argv[i];
// }

// console.log(sum);

// I/O
// read a file and print the number of lines it contains
// var fs = require('fs');

// var buffer = fs.readFileSync(process.argv[2]);
// var lines = buffer.toString().split('\n').length - 1;
// console.log(lines);

// note: you can avoid the .toString() by passing 'utf8' as the
// second argument to readFileSync, then you'll get a String!
//
// fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1

// ASYNC I/O
// read a file asynchronously and print the number of lines it contains
// var fs = require('fs');
// var file = process.argv[2];
// fs.readFile(file, 'utf8', function(err, data){
// 	if(err) throw err;
// 	//console.log(data);
// var lines = data.split('\n').length - 1;
// console.log(lines);	
// });

// FILTERED LS
// create a program that prints a list of files in a given directory, 
// filtered by the extension of the files.

// var fs = require('fs');
// var path = require('path');
// var dir = process.argv[2];
// var ext = process.argv[3];

// fs.readdir(dir, function(err, list) {
// 	if(err) throw err;
// 	for (var i = 0; i < list.length; i++) {
// 		if(path.extname(list[i]) == "."+ext)
// 			console.log(list[i]);
// 	};
// });

// MODULAR (functions)
// var dir = process.argv[2];
// var ext = process.argv[3];
// var mod = require('./dirextmodule');

// mod(dir, ext, function(err, data){
// 	if(err) return console.error('There was an error:', err);
// 	data.forEach(function (file){
// 		console.log(file);
// 	})
// });

// HTTP CLIENT
// Write a program that performs HTTP GET requests... and it 
// reads the response for data, error and end.
// var http = require('http');

// http.get(process.argv[2], function(response){
// 	response.setEncoding('utf8');
// 	response.on('data', console.log);
// 	response.on('error', console.error);
// });

// HTTP COLLECT
//
// var bl = require('bl');
// var http = require('http');

// http.get(process.argv[2], function(response){
// 	response.pipe(bl(function(err, data){
// 		if(err)
// 			return console.error(err);
// 		console.log(data.length);
// 		console.log(data.toString());
// 	}))
// });

// ASYNC
// note: try official solution using a counter
// var http = require('http');
// var bl = require('bl');

// var url1 = process.argv[2];
// var url2 = process.argv[3];
// var url3 = process.argv[4];

// http.get(url1, function(response){
// 	response.pipe(bl(function(err, data){
// 		if(err)
// 			return console.error(err);
// 		if(data)
// 		{
// 			console.log(data.toString());

// 			http.get(url2, function(response){
// 				response.pipe(bl(function(err, data){
// 				if(err)
// 					return console.error(err);
// 				if(data){
// 					console.log(data.toString());
// 					http.get(url3, function(response){
// 					response.pipe(bl(function(err, data){
// 					if(err)
// 						return console.error(err);
// 					if(data)
// 						console.log(data.toString());
// 						}))
// 					});
// 				}
// 			}))
// 			});
// 		}
// 	}))
// });

// TIME SERVER

// var net = require('net');

// function zeroFill(i){
// 	return (i < 10 ? '0' : '') + i
// }

// function now(){
// 	var d = new Date()
// 	return d.getFullYear() + '-'
// 		+ zeroFill(d.getMonth() + 1) + '-'
// 		+ zeroFill(d.getDate()) + ' '
// 		+ zeroFill(d.getHours()) + ':'
// 		+ zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket){
// 	socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]));

// HTTP FILE SERVER

// var http = require('http');
// var fs = require('fs');

// var server = http.createServer(function(request, response){
// 	var file = process.argv[3];
// 	var readStream = fs.createReadStream(file);
// 	readStream.on('open', function(){
// 		readStream.pipe(response);
// 	});
// 	readStream.on('error', function(err){
// 		response.end(err)
// 	})
// })

// server.listen(Number(process.argv[2]))

// HTTP UPPERCASERER
// var http = require('http');
// var fs = require('fs');
// var map = require('through2-map');
// var port = process.argv[2];

// var server = http.createServer(function(req, res){
// 	req.on('data', function(data){
// 		data = String(data).toUpperCase();
// 		res.write(data);
// 		res.setTimeout(1000, function(){
// 			res.end();
// 		});
// 	});
// });


// server.listen(Number(port));

// HTTP JSON API SERVER
var url = require('url');
var qs = require('querystring');
var http = require('http');

var server = http.createServer(function(req, res){
	res.writeHead(200, { 'Content-Type': 'application/json' });
	if(req.method === 'GET') {
		var srvUrl = req.url;
		var path = url.parse(srvUrl).pathname;
		if(path === '/api/parsetime'){
			var str = JSON.stringify(qs.parse(url.parse(srvUrl).query, true));
			
			var date = new Date(str.substr(8, 19));
			console.log(date);
			res.write('{\"hour\":' + date.getHours() + ',\"minute\":'
			+ str.substr(22,2) + ',\"second\":' + str.substr(25,2) + '}'
			)
		}
		if(path === '/api/unixtime'){
			var query = url.parse(req.url, true).query;
			//console.log(query.iso);
			//var str = JSON.stringify(query.iso);
			var str = JSON.stringify(qs.parse(url.parse(srvUrl).query, true));
			var date = new Date(str.substr(8,24));
			res.write('{\"unixtime\":' + date.getTime() + '}')
		}
		res.end();
	}
})

server.listen(process.argv[2]);
