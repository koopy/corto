/* jshint undef: true, unused: false */
var BaseFilter = require('./base-filter');

/**
 * 在反序列化中需要排除的方法名称
 * @type {RegExp}
 */
var SKIP_METHOD = /count|exists/;

/**
 * 序列化器过滤器
 */
var SerializerFilter = BaseFilter.extend({
  /**
   * 使用函数柯里化节约从app获取默认serializerType设定的时间
   * @param app loopback实例
   * @returns {Function}　
   */
  _getSerializer: function () {
    var serializerType = this.app.get('serializerType') || 'rest';
    /**
     * 获取serializerType变量
     * 查找顺序为
     *    1.请求头中的 serializerType
     *    2.系统配置的 serializerType
     *    3.默认的serializer: restSerializer
     */
    return function (req) {
      return req.header['serializerType'] || serializerType;
    };
  },

  init: function () {
    this._super.apply(this, arguments);
    this.getSerializerType = this._getSerializer();
  },

  checkBefore: function (serializer) {
    return !!serializer;
  },

  checkAfter: function (ctx, serializer) {
    var methodName = ctx.method.name;
    return !SKIP_METHOD.test(methodName) && !!serializer;
  },


  getRootKey: function (ctx) {
    var accepts = ctx.method.accepts, accept;

    for (var i = 0, l = accepts.length; i < l; i++) {
      accept = accepts[i];
      if (accept.http && accept.http.source === 'body') {
        return accept.arg;
      }
    }

    return 'data';
  },


  /**
   * 对前端传入的payload进行反序列化
   * @param ctx Http-Context
   * @param previousResult
   * @param cb
   */
  doBefore: function (ctx, previousResult, cb) {
    var serializerType = this.getSerializerType(ctx.req),
      serializer = this.container.lookup('serializer:' + serializerType),
      modelCtor = ctx.method.ctor,
      rootKey=this.getRootKey(ctx),
      payload = ctx.args[rootKey]
      ;
    ctx.req.serializer = ctx.req.serializer || serializer;

    if (this.checkBefore(serializer)) {
      ctx.args[rootKey] = serializer.extract(modelCtor, payload);
    }
    cb();

  },

  /**
   * 对从loopback的对象进行解析
   * @param ctx
   * @param previousResult
   * @param cb
   */
  doAfter: function (ctx, previousResult, cb) {
    var modelCtor = ctx.method.ctor,
      serializerType = this.getSerializerType(ctx.req),
      serializer = this.container.lookup('serializer:' + serializerType)
      ;

    if (this.checkAfter(ctx, serializer)) {
      ctx.result = serializer.serialize(modelCtor, previousResult);
    }
    cb();
  }
});

module.exports = SerializerFilter;
