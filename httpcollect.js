// HTTP COLLECT
var bl = require('bl');
var http = require('http');

http.get(process.argv[2], function(response){
	response.pipe(bl(function(err, data){
		if(err)
			return console.error(err);
		console.log(data.length);
		console.log(data.toString());
	}))
});