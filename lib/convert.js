/*
By default the memory limit on Node.js is 512mb, for larger conversions use.
node --max-old-space-size=1024 convert.js #increase to 1gb
node --max-old-space-size=2048 convert.js #increase to 2gb
node --max-old-space-size=3072 convert.js #increase to 3gb
node --max-old-space-size=4096 convert.js #increase to 4gb
node --max-old-space-size=5120 convert.js #increase to 5gb
node --max-old-space-size=6144 convert.js #increase to 6gb
node --max-old-space-size=7168 convert.js #increase to 7gb
node --max-old-space-size=8192 convert.js #increase to 8gb
*/
var fs = require('fs');
var finder = require('findit')('./data');
//var path = require('path');


function convertFile() {
    finder.on('file', function (file, stat) {
        if(file.indexOf(".dat") > -1 && (file.indexOf(".dat") === file.length - 4)) {
            console.log(file);
            var jsonFile = [{}];
            var objNameArray = [];
            var lineNum = 0;
            var jsonLineNum = 0;

            function readLines(input) {
              var remaining = '';

              input.on('data', function(data) {
                remaining += data;
                var index = remaining.indexOf('\n');
                var last  = 0;
                var lineArray = [];
                while (index > -1) {
                    var line = remaining.substring(last, index);
                    last = index + 1;
                    index = remaining.indexOf('\n', last);
                    buildJSON(line.split(" "));
                    if(lineNum % 50000 === 0 && lineNum !== 0) {
                        buildJSONFile();
                    }
                }

                remaining = remaining.substring(last);
              });

              input.on('end', function() {
                if (remaining.length > 0) {
                  //func(remaining);
                }
                //  Creates JSON file using the same file name with a .json file type.
                fs.writeFile(file.substring(0, file.length - 4) + "_" + (Math.floor(lineNum/50000) + 1).toString() + ".json", JSON.stringify(jsonFile),function(err){
                    if(err) {
                        return console.log(err);
                    }
                    //console.log('JSON: ' + JSON.stringify(jsonFile));
                    console.log("The file was saved.");
                });
              });
            }

            function buildJSON(arrayValue) {
                var jsonObj = {};

                if(objNameArray[0] !== "EIN"){
                    objNameArray = arrayValue;
                    //objNameArray.pop();
                    if(objNameArray[0] === "EIN"){
                        colIdexLength = objNameArray.length;
                    }
                }
                if(arrayValue[0] !== "EIN") {
                    //  Iterates through each column.
                    for(var c = 0; c < objNameArray.length; c++) {
                        jsonObj[objNameArray[c]] = arrayValue[c];
                    }
                    //console.log("Line: " + lineNum);
                    jsonFile[jsonLineNum] = jsonObj;
                    console.log(lineNum);
                    console.log(jsonLineNum);

                    lineNum += 1;
                    jsonLineNum += 1;
                }
            }

            function buildJSONFile() {
                var newFileName = file.substring(0, file.length - 4) + "_" + (lineNum/50000).toString() + ".json";
                //  Creates JSON file using the same file name with a .json file type.
                fs.writeFile(newFileName, JSON.stringify(jsonFile),function(err){
                    if(err) {
                        return console.log(err);
                    }
                    //console.log('JSON: ' + JSON.stringify(jsonFile));
                    console.log("The file " + newFileName + " was saved.");
                    jsonFile = [{}];
                    jsonLineNum = 0;
                });

            };

            var input = fs.createReadStream(file/*file found in directory with .dat extention*/);
            readLines(input);

        }
    });
};

// Enables `get` method to be used.
module.exports.convert = convertFile;