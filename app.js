'use strict';
console.dir(process.argv);
var urls = process.argv.slice(2);

var link = require('./lib/download');
urls.forEach(link.get);