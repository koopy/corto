/**
 * Created by tms on 2014/8/25.
 */
'use strict';

var path = require('path');
var requireAsHash = require('../utils/require-as-hash');

function SetupSerializers(server,container) {
  var pattern = /(\w+)-serializer/;
  var directory = path.resolve(__dirname, '../serializers');
  var serializers = requireAsHash(pattern, directory);
  Object.keys(serializers)
    .forEach(function (file) {
      var suffix = pattern.exec(file).pop().toLowerCase();
      container.register('serializer:' + suffix, serializers[file]);
    });
}

module.exports = SetupSerializers;
