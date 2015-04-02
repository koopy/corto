var loopback = require('loopback');
module.exports = function (SysUser) {
  function defaultDate() {
    return new Date();
  }

  SysUser.definition.properties.created.default =
    SysUser.definition.properties.modified.default =
      defaultDate();

  SysUser.definition.properties.status.default =
    SysUser.definition.properties.modified.default = '2';

  SysUser.uniqueness = function (filter, cb) {
    var err = null;
    if (filter.nickname == 'jwy') {
      err = new Error('The nickname has exists');
      err.statusCode = 409;
      err.code = 'CONFLICT';
      return cb(err);
    }
  };
  var typeName = SysUser.modelName;
  loopback.remoteMethod(SysUser.uniqueness, {
    description: 'uniqueness check',
    accepts: {arg: 'filter', type: 'object', description: 'Filter defining fields, where, orderBy, offset, and limit'},
    returns: {arg: 'data', type: [typeName], root: true},
    http: {verb: 'get', path: '/uniqueness'}
  });
};
