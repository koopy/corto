/**
 * Created by Administrator on 2014/8/20.
 */
var _ = require('lodash');
var Serializer = require('./serializer');
var inflection = require('inflection');

var ActiveModelSerializer = Serializer.extend({

  extract: function (modelCtor, payload) {
    return this.normalizePayload(modelCtor, payload);
  },

  serialize: function (modelCtor, previosResult) {
    var result = {},
      isPlural = Array.isArray(previosResult),
      rootName = inflection.underscore(
        isPlural ? modelCtor.pluralModelName : modelCtor.modelName)
      ;

    result[rootName] = this.camelizeToUnderscore(previosResult);
    return result;
  },

  _arrayExtract: function (array) {
    _.forEach(array, function (item) {
      if (_.isPlainObject(item)) this.underscoreToCamelize(item);
    }, this);
  },

  underscoreToCamelize: function (data) {
    var camelizedName;
    _.forOwn(data, function (value,key) {
      if (Array.isArray(value)) {
        this._arrayExtract(value);
      } else if (_.isPlainObject(value)) {
        this.underscoreToCamelize(value);
      }

      if (key !== (camelizedName = inflection.camelize(key, true))) {
        data[camelizedName] = value;
        delete data[key];
      }
    }, this);
    return data;
  },

  camelizeToUnderscore: function (previousResult) {
    if (Array.isArray(previousResult)) {
      previousResult = _.map(previousResult, function (item) {
        return this._camelizeToUnderscore(this._toPlainObject(item));
      }, this);
    } else {
      previousResult = this._camelizeToUnderscore(
        this._toPlainObject(previousResult));
    }
    return previousResult;
  },

  _toPlainObject:function(obj){
    if(_.isFunction(obj.toJSON)) return obj.toJSON();
    return obj;
  },

  _camelizeToUnderscore: function (plainObj) {
    var underscoredName;
    _.forOwn(plainObj, function (value, key) {

      if (Array.isArray(value)) {
        this._arraySerialize(value);
      } else if (_.isPlainObject(value)) {
        this._camelizeToUnderscore(value);
      }

      underscoredName = inflection.underscore(key);

      if (underscoredName !== key) {
        plainObj[underscoredName] = plainObj[key];
        delete plainObj[key];
      }
    }, this);

    return plainObj;
  },

  _arraySerialize: function (array) {
    _.forEach(array, function (item) {
      if (_.isPlainObject(item)) this._camelizeToUnderscore(item);
    }, this);
  },

  normalizePayload: function (modelCtor, payload) {
    var roots, root;

    if (payload) {
      roots = [modelCtor.modelName, modelCtor.pluralModelName];

      while (roots.length > 0) {
        root = roots.shift();
        var reqBody = payload[inflection.underscore(root)];
        if (_.isPlainObject(reqBody)) {
          payload = this.underscoreToCamelize(reqBody);
        }
      }
    }
    return payload;
  }
});

module.exports = ActiveModelSerializer;
