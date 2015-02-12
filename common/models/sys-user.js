module.exports = function(SysUser) {
  function defaultDate(){
    return new Date();
  }
  SysUser.definition.properties.created.default =
  SysUser.definition.properties.modified.default =
    defaultDate();

};
