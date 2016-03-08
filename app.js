'use strict';
// console.dir(process.argv);
/* Stores URLs in an array. */
var urls = process.argv.slice(2);
/* Includes download functionality */
var link = require('./lib/download');
/* Iterates and downloads each link */
urls.forEach(link.get);