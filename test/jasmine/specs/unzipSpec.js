fs = require('fs');
var crypto = require('crypto');
var Unzip = require('../../../lib/unzip.js');

describe("A file deflater", function() {
  var unzip = new Unzip();

  it("should extract a known file with a matching MD5 checksum", function() {
    const KNOWN_MD5 =
        fs.readFileSync('../resources/py14_990.dat',
          'utf8', function read(err, data) {
            if (err) throw err;
          }
        );
    const UNZIPPED_DATA =
        unzip.deflate('../../../data/14eofinextract990.zip');

    // Make checksum from deflated data. Compare it to known good data.
    var md5sum = crypto.createHash('md5');
    md5sum.update(UNZIPPED_DATA);
    const UNZIPPED_MD5 = md5sum.digest('hex');

    expect(UNZIPPED_MD5).toEqual(KNOWN_MD5);
  });
});