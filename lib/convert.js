var fs = require('fs');
var dataArray = [[]];
var dataArrayIndex = 0;
var jsonString = "";
var jsonFile = [{}];

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    var last  = 0;
    var lineArray = [];
        //console.log('index: ' + index);
    while (index > -1) {
      var line = remaining.substring(last, index);
      last = index + 1;
      func(line);
      index = remaining.indexOf('\n', last);
    }

    remaining = remaining.substring(last);
        //  Saves line into an array
        lineArray[dataArrayIndex] = toArray(line);

        //  Saves lineArray into a multidimensional array
        dataArray[dataArrayIndex] = lineArray[dataArrayIndex];

        dataArrayIndex++;
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      //func(remaining);
      //dataArrayIndex = 0;
    }
      convertMultiArrayToString(dataArray);
  });
}

function toArray(line) {
    return line.split(" ");
}

function convertMultiArrayToString(arrayValue) {
    var colIdexLength = arrayValue[0].length;
        jsonString = "";

    //console.log("columns: " + arrayValue[0].length);
        //jsonString += "[    ";
        //  Iterates through each row.
        for(var r = 1; r < dataArray.length; r++) {
            //  Iterates through each column.
            for(var c = 0; c < dataArray[0].length; c++) {
                //console.log("r: " + r + " c: "+ c);
                /*switch(c) {
                    case 0:
                        jsonString += '{ "' + dataArray[0][c] + '": "' + dataArray[r][c] + '"';
                        break;
                    default:
                        jsonString += ', "' + dataArray[0][c] + '": "' + dataArray[r][c] + '"';
                        break;
                }
              
                //jsonString += "";
                //console.log('dataArray: ' + dataArray[0][r]);

                if(r === dataArray.length && c === dataArray[0].length){
                    jsonString += "}]";
                } else if(c === dataArray[0].length) {
                    jsonString += "},";
                }*/

                jsonFile[r-1][dataArray[0][c]] = dataArray[r][c];








            console.log('JSON: ' + jsonFile[r-1][dataArray[0][c]]);

            }
            //console.log('JSON: ' + jsonString);
        }
        //console.log('JSON: ' + jsonFile);


}

function func(data) {
    var lineArray = [data.split(" ")];
}

var input = fs.createReadStream('../data/py14_990.dat');
readLines(input, func);

fs.writeFile("../data/py14_990.json", jsonString,function(err){
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved.");
});