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