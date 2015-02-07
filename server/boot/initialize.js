/**
 * Created by tms on 2014/8/26.
 */
'use strict';


var path = require('path');
var requireAsHash = require('../utils/require-as-hash');

module.exports = function (server) {
  var container = server.get('container');
  var directory = path.resolve(__dirname, '../initializers');
  var pattern = /.*/;
  var initializers = requireAsHash(pattern, directory);
  Object.keys(initializers).forEach(function (key) {
    var initializer = initializers[key];
    initializer(server,container);
  });
};


