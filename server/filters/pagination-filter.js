/* jshint undef: true, unused: false */
var BaseFilter = require('./base-filter');
var _ = require('lodash');
/**
 * 序列化器过滤器
 */
var PaginationFilter = BaseFilter.extend({
  /**
   * 检查是否需要进行分页信息处理
   * @param ctx
   * @param previousResult
   * @returns {*}
   */
  checkAfter: function (ctx, previousResult) {
    return ctx.req.header('pagination', false);
  },

  /**
   * 从filter这个参数中获取分页的过滤条件
   * @param args
   * @returns {*}
   * @private
   */
  _convertArg: function (args) {
    if (args.filter && _.isString(args.filter)) {
      try {
        return JSON.parse(args.filter);
      } catch (e) {
        throw new Error('can not cast filter from string to object.');
      }
    }
    return args.filter ? args.filter : args;
  },

  /**
   * 将分页的信息打入返回的数据中
   * @param ctx
   * @param cb
   */
  patchPageMeta: function (ctx, cb) {
    var modelCtor = ctx.method.ctor,
      countMethod = ctx.method.sharedClass.find('count', true),
      args = this._convertArg(ctx.args)
      ;

    countMethod.invoke(modelCtor, args, function (err, previousResult) {
      var meta = ctx.result['meta'] = ctx.result['meta'] || {};
      meta['count'] = previousResult.count;
      var limit = args && args.filter && args.filter.limit;
      meta['totalPage'] = Math.ceil(previousResult.count / (limit || 10));
      cb(err, previousResult);
    });
  },

  /**
   * 分页后置拦截面
   * @param ctx
   * @param previousResult
   * @param cb
   */
  doAfter: function (ctx, previousResult, cb) {
    if (this.checkAfter(ctx, previousResult)) {
      this.patchPageMeta(ctx, cb);
    } else {
      cb();
    }
  }
});

module.exports = PaginationFilter;
