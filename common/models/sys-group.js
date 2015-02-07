var exclude = require('../../server/remote-method/find-exclude');
module.exports = function (SysGroup) {
  SysGroup.excludeSerializered = true;
  SysGroup.findExclude = exclude.findExclude;
  exclude.setupExclude(SysGroup.findExclude,SysGroup);
};