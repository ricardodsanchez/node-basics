// Reads all files in a directory and filters the ones that match an specific file extension
 module.exports = function(dir, ext, callback){
 	var fs = require('fs');
	var path = require('path');
	var module = require('module');
	var data = []; 

	fs.readdir(dir, function(err, list) {
		if(err) {
			return callback(err);
		}
		
		for (var i = 0; i < list.length; i++) {
			if(path.extname(list[i]) == "." + ext) {
				data.push(list[i]);
			}
		};

		return callback(null, data);
	});
};


