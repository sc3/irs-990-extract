fs = require('fs');
var crypto = require('crypto');
var Download = require('../../../lib/download.js');

describe("A file downloader", function() {
  var download = new Download();

  it("should download a known file with a matching MD5 checksum", function() {
    const KNOWN_MD5 =
        fs.readFileSync('../resources/14eofinextract990.zip.MD5SUM',
          'utf8', function read(err, data) {
             if (err) throw err;
        });
    const DOWNLOAD_DATA =
        download.getData('http://www.irs.gov/pub/irs-soi/14eofinextract990.zip');

    // Create MD5 hash.
    var md5sum = crypto.createHash('md5');
    md5sum.update(DOWNLOAD_DATA);
    const DOWNLOAD_MD5 = md5sum.digest('hex');

    expect(DOWNLOAD_MD5).toEqual(KNOWN_MD5);
  });
});