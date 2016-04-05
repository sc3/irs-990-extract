'use strict';
 //console.dir(process.argv);
var perform = process.argv[2];
/* Includes download functionality */
var download = require('./lib/download');
/* Includes unzip functionality */
var file = require('./lib/unzip');
/* Includes convert functionality */
var data = require('./lib/convert');
/* Stores URLs in an array. */
var urls;

if(perform === 'download' || perform === 'unzip' || perform === 'convert'){

	urls = process.argv.slice(3);
	// Iterates through and downloads each link.
	if(perform === 'download') {
		urls.forEach(download.get);
	}
	// Unzip files.
	if(perform === 'unzip') {
		file.unzip();
		console.log("Unzip me!");
	}
	// Converts .dat files to .json
	if(perform === 'convert') {
		console.log("Convert me!")
		data.convert();
	}

} else {	
	//console.dir(process.argv);
	urls = process.argv.slice(2);

	if(urls.length > 0) {
		console.log("Your file" + ((urls.length > 1)?"s are":" is") + " being downloaded.");
		urls.forEach(download.get);
	} else {
		console.log("Please specify if you would liike to 'download', 'unzip', or 'convert' your files.")
	}

}