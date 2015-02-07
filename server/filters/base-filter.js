var Class = require('hydro-class');

var BaseFilter = Class.extend({
  doBefore: function(ctx, previousResult, cb){
    cb();
  },
  doAfter: function(ctx, previousResult, cb){
    cb();
  },
  checkBefore: function () {
    return false;
  },
  checkAfter: function () {
    return false;
  }
});

module.exports = BaseFilter;
