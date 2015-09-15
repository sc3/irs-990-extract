var fs = require('fs');
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
    fs.writeFile("../data/py14_990.json", JSON.stringify(jsonFile),function(err){
        if(err) {
            return console.log(err);
        }
        console.log('JSON: ' + JSON.stringify(jsonFile));
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

        jsonFile[LineNum] = jsonObj;
        LineNum++;
    }
}

var input = fs.createReadStream('../data/py14_990.dat');
readLines(input);

