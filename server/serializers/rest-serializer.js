var _ = require('lodash');
var Serializer = require('./serializer');
var inflection = require('inflection');
/**
 *
 * 对模型进行切面，在数据输出到客户端前进行数据格式的调整，
 * 使得满足Ember-Data的数据规范要求
 * －－－－－－－－－－－－－－－－－－－－－－－
 * REST格式序列化器
 * 与过滤器一样，将前端的请求如
 * {
 *    "post":{
 *      "title": "Git Stash用法",
 *      "body": "This is post body"
 *     }
 * }
 * 反序列化为
 * {
 *   "title": "Git Stash用法",
 *   "body": "This is post body"
 * }
 * －－－－－－－－－－－－－－－－－－－－－－－
 * 将loopback返回的结果如
 * {
 *   "title": "Git Stash用法",
 *   "body": "This is post body"
 * }
 * 序列化为
 * {
 *    "post":{
 *      "title": "Git Stash用法",
 *      "body": "This is post body"
 *     }
 * }
 */
var RESTSerializer = Serializer.extend({

  extract: function (modelCtor, payload) {
    return this.normalizePayload(modelCtor, payload);
  },

  serialize: function (modelCtor, previousResult) {
    var result = {},
      isPlural = Array.isArray(previousResult);
    if(!_.isEmpty(previousResult)){
      modelCtor = isPlural ? previousResult[0].constructor : previousResult.constructor;
    }else{
      //TODO how to know self or relation type
    }

    var rootName = inflection.camelize(
        isPlural ? modelCtor.pluralModelName : modelCtor.modelName, true)
      ;

    result[rootName] = previousResult;
    return result;
  },

  normalizePayload: function (modelCtor, payload) {
    var roots, root;
    if (payload) {
      roots = [modelCtor.modelName, modelCtor.pluralModelName];

      while (roots.length > 0) {
        root = roots.shift();
        //1.根据Ember-Data RestSerializer 默认的typeForRoot规则，将root转换为骆驼峰形式
        //2.忽略modelCtor大小写的问题，专注于数据提取，即对于模型User与user而言，统一处理数据提取
        //3.根据模型名称单数 -> 模型名称复数进行查找。
        var reqBody = payload[inflection.camelize(root, true)];

        if (_.isPlainObject(reqBody)) {
          payload = reqBody;
          break;
        }
      }
    }
    return payload;
  }
});

module.exports = RESTSerializer;
