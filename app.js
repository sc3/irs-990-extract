'use strict';
// console.dir(process.argv);
var perform = process.argv[2];
/* Includes download functionality */
var download = require('./lib/download');
/* Includes unzip functionality */
var file = require('./lib/unzip');
/* Stores URLs in an array. */
var urls;

if(perform === 'download' || perform === 'unzip' || perform === 'convert'){

	urls = process.argv.slice(3);
	/* Iterates and downloads each link */
	if(perform === 'download') {
		urls.forEach(download.get);
	}

	if(perform === 'unzip') {
		file.unzip();
		console.log("Unzip me!");
	}

	if(perform === 'convert') {
		/* Need to include this functionality. */
	}

} else {
	/* need to add async functionality to allow the files to download, unzip and comvert */	
	urls = process.argv.slice(2);
	urls.forEach(download.get);
	file.unzip();
	/* need to include converting functionality */
}