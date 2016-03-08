var download = require('download-file');
 
var options = {
	directory: "./data/",
	filename: ""
};

function getFile(url) {
	//console.log(url.split("/").slice(-1).pop());
	/* Sets the file name for the downloaded file */
	options.filename = url.split("/").slice(-1).pop();
	download(url, options, (err) => {
		if (err) throw err;
		console.log("File(" + options.filename + ") Successfully Downloaded!");
	});
};
// Enables get method to be used.
module.exports.get = getFile;