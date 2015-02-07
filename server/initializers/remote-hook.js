/* jshint undef: true, unused: false */
var setupFilter = require('../filters');
var async = require('async');

function excludeSerializer(models){
  var ret =[];
  models.forEach(function(model){
    if(!model.excludeSerializered){
      ret.push(model);
    }
  });
  return ret;
}
/**
 * 在loopback启动过程中，进行序列化器切面支持
 * @param server
 */
function RemoteHook(server, container) {
  var models = server.models();
  models = excludeSerializer(models);
  var filters = setupFilter(server, container);

  function bindDoService(ctx, previousResult, type) {
    var method = 'do' + type;
    return filters.map(function (filter) {
      return function (cb) {
        filter[method](ctx, previousResult, cb);
      };
    });
  }

  models.forEach(function (model) {

    model.beforeRemote('**', function (ctx, previousResult, next) {
      var doBeforeMethods = bindDoService(ctx, previousResult, 'Before');

      async.series(doBeforeMethods, function () {
        next();
      });
    });

    model.afterRemote('**', function (ctx, previousResult, next) {
      var doAfterMethods = bindDoService(ctx, previousResult, 'After');
      async.series(doAfterMethods, function () {
          next();
        }
      );
    });
  });
}

module.exports = RemoteHook;
