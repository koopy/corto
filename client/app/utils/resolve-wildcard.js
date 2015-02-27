if (typeof requirejs.entries === 'undefined') {
  requirejs.entries = requirejs._eak_seen;
}
var entries = requirejs.entries;
//TODO cache to speed up
/**
 * *  current parent's all child
 * ** all sub level,cascade
 */
export default function resolveWildcard(path){
  var ret = [];
  var parts = path.split('/');
  var wildcard = parts[parts.length - 1];
  var prefix = parts.slice(0,-1);
  var parent = prefix.join('/');
  //end
  if (wildcard.indexOf('*')>-1) {
    for(var module in entries){
      var moduleParts = module.split('/');
      var modulePrefix = moduleParts.slice(0, prefix.length);
      var remain = moduleParts.slice(modulePrefix.length);
      var parentBase = modulePrefix.join('/');
      if (parent == parentBase) {
        if ((wildcard === '*' && remain.length == 1) || (wildcard === '**' && remain.length >= 1)) {
          ret.push(module);
        }
      }
    }
  }else{
    //TODO use minimatch
  }
  var names = ret;
  ret = ret.map(function(moduleName){
    var module = require(moduleName, null, null, true /* force sync */);

    if (module && module['default']) { module = module['default']; }

    if (module === undefined) {
      throw new Error("Unable to find module with moduleName: " + moduleName);
    }

    return module;
  });
  return {
    modules: ret,
    names: names
  };
}
