var exclude = require('../../server/remote-method/find-exclude');
module.exports = function(SysPosition) {
  SysPosition.excludeSerializered = true;
  SysPosition.findExclude = exclude.findExclude;
  exclude.setupExclude(SysPosition.findExclude,SysPosition);
};
