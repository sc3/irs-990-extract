'use strict';

var AdmZip = require("adm-zip");
var finder = require('findit')(/*process.argv[2] || */ './data');
//var path = require('path');

var zip;
function unzipFile() {
	finder.on('file', function (file, stat) {
		if(file.indexOf(".zip") > -1) {
	    	console.log(file);

			zip = new AdmZip(file);
			// get all entries and iterate them
			zip.getEntries().forEach(function(entry) {
			    var entryName = entry.entryName;
			    var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
			    //console.log(zip.readAsText(entry)); // outputs the decompressed content of the entry  
			});
			// extracts everything 
			zip.extractAllTo(/*target path*/"./data", /*overwrite*/true);
		}
	});
};


/* Enables `unzip` method to be used. */
module.exports.unzip = unzipFile;