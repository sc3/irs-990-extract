var Convert = require('../../../lib/convert.js');
fs = require('fs');

describe("A space-separated file to JSON converter", function() {
  var convert = new Convert();

  const TEST_JSON =
    fs.readFileSync('../resources/py14_990.sample.dat',
        'utf8', function read(err, data) {
      if (err) throw err;
    });
  const INPUT_DATA =
    fs.readFileSync('../resources/py14_990.sample.json',
        'utf8', function read(err, data) {
      if (err) throw err;
      INPUT_DATA = data.toString();
    });
  var outputData; // Output of the conversion method.

  it("should convert space-separated data to JSON", function() {
    expect(convert.toJson(outputData)).toEqual(TEST_JSON);
  })
})