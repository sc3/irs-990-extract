var AdmZip = require('adm-zip');

var zipFile = "14eofinextract990";
// reading archives 
var zip = new AdmZip("../data/" + zipFile + ".zip");

// extracts the specified file to the specified location 
zip.extractEntryTo(/*entry name*/"data/" + zipFile + ".txt", /*target path*/"/home/me/tempfolder", /*maintainEntryPath*/false, /*overwrite*/true);
// extracts everything 
zip.extractAllTo(/*target path*/"/home/marcin/irs-990-scraper/data", /*overwrite*/true);
