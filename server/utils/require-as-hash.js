/**
 * Created by tms on 2014/8/26.
 */
'use strict';

var fs = require('fs');
var path = require('path');

function requireAsHash(pattern, directory) {
  var dirPath = directory || __dirname;
  return fs.readdirSync(dirPath)
    .reduce(function (hash, file) {
      var fileName = path.basename(file, '.js');
      if (pattern.test(fileName)) {
        var klass = require(dirPath + '/' + file);
        hash[fileName] = klass;
      }
      return hash;
    }, {});
}

module.exports = requireAsHash;