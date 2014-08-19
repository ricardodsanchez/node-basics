// FILTERED LIST
var fs = require('fs');
var path = require('path');
var dir = process.argv[2];
var ext = process.argv[3];

fs.readdir(dir, function(err, list) {
	if(err) throw err;
	for (var i = 0; i < list.length; i++) {
		if(path.extname(list[i]) == "."+ext)
			console.log(list[i]);
	};
});