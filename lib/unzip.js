var AdmZip = require("adm-zip");

var zipFile = "14eofinextract990";
// reading archives 
var zip = new AdmZip("../data/" + zipFile + ".zip");

// get all entries and iterate them
zip.getEntries().forEach(function(entry) {
    var entryName = entry.entryName;
    var decompressedData = zip.readFile(entry); // decompressed buffer of the entry
    console.log(zip.readAsText(entry)); // outputs the decompressed content of the entry  
});


// extracts the specified file to the specified location 
zip.extractEntryTo(/*entry name*/zipFile + ".txt", /*target path*/"/home/marcin/irs-990-scraper/data/", /*maintainEntryPath*/false, /*overwrite*/true);
// extracts everything 
zip.extractAllTo(/*target path*/"/home/marcin/irs-990-scraper/data", /*overwrite*/true);
