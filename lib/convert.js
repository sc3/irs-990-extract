var fs = require('fs');
var finder = require('node-findit')(process.argv[2] || '../test/jasmine/resources');
var path = require('path');

finder.on('file', function (file, stat) {
    if(file.indexOf(".dat") > -1) {
        console.log(file);
        var jsonFile = [{}];
        var objNameArray = [];
        var LineNum = 0;

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
            }

            remaining = remaining.substring(last);
          });

          input.on('end', function() {
            if (remaining.length > 0) {
              //func(remaining);
            }
            //  Creates JSON file using the same file name with a .json file type.
            fs.writeFile(file.substring(0, file.length - 3) + "json", JSON.stringify(jsonFile),function(err){
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
                objNameArray.pop();
                if(objNameArray[0] === "EIN"){
                    colIdexLength = objNameArray.length;
                }
            }
            if(arrayValue[0] !== "EIN") {
                //  Iterates through each column.
                for(var c = 0; c < objNameArray.length; c++) {
                    jsonObj[objNameArray[c]] = arrayValue[c];
                }
                //console.log("Line: " + LineNum);
                jsonFile[LineNum] = jsonObj;
                LineNum++;
            }
        }

        var input = fs.createReadStream(file/*file found in directory with .dat extention*/);
        readLines(input);

    }
});