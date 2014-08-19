function(dir, ext, function(err, data){
	var fs = require('fs');
	var path = require('path');

	fs.readdir(dir, function(err, list) {
		if(err) 
			throw err;
		for (var i = 0; i < list.length; i++) {
			if(path.extname(list[i]) == "."+ext)
	};
});
})

