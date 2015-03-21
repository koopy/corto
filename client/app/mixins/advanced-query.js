import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;
/**
 *  Comparators:$gt,$gte,$lt,$lte,$in,$nin
 *  traverse:$or,$and
 *
 *  usage:
 *  {
 *    fields:[],
 *    order:[],
 *    where:{
 *      field:{
 *        $eq:true
 *      },
 *      field:{
 *        '$like':true
 *      },
 *      field:{
 *        '$gt':true
 *      },
 *      field:{
 *        'gte':true
 *      }
 *      '$and':[{
 *        field:{
 *          '$like':true
 *        }
 *      }]
 *    }
 *  }
 *  result :
 *  where:{
 *    field:value,
 *    field:{$gt:value},
 *    field:{$gte:value},
 *    field:{$lt:value},
 *    field:{$lte:value},
 *    $or:[{query1},{query2}...],
 *    $and:[{query1},{query2}...]
 *  }
 */
/**
 * for simple model
 */
var EnumerableUtils = Ember.EnumerableUtils;
var DELIMITER = ',';
var UNDEFINED = undefined,
  STRING = '%%@%',
  VALUE = null,
  ARRAY = [],
  BETWEEN = 2;
var $where = {
  nlike: STRING,
  like: STRING,
  gt: VALUE,
  gte: VALUE,
  lt: VALUE,
  lte: VALUE,
  or: ARRAY,
  and: ARRAY,
  inq: ARRAY,
  between: BETWEEN
};
var AdvancedQuery = Ember.Object.extend({
  modelConstructor: null,
  init: function () {
    this._super();
    Ember.assert('The advanced query need a model', this.get('modelConstructor'));
    Ember.assert('The advanced must belongs to other object', this.get('owner'));
    this.normalizeFields();
    this.query = {};
    if (this.get('filters') === undefined) {
      this.filters = {};
    }
    this.buildFilter();
  },
  normalizeFields: function () {
    var model = this.get('modelConstructor');
    var fields = get(model, 'fields');
    var normalized = [];
    fields.forEach(function (key, value) {
      if (key === 'attribute') {
        normalized.push(value);
      }
    });
    if (normalized.length) {
      //TODO warn
    }
    this.set('fields', normalized);
  },

  buildFilter: function () {
    var filters = this.get('filters');
    if (filters.hasOwnProperty('fields')) {
      this.buildFields(filters.fields);
    }
    if (filters.hasOwnProperty('order')) {
      this.buildOrder(filters.order);
    }
    if (filters.hasOwnProperty('where')) {
      this.buildWhere(filters.where);
      this.set('whereStructure', filters.where);
      this.set('wherePair', {});
    }
  },
  /**
   * @Return {Array}
   */
  buildFields: function (fields) {
    var result = [];
    return result;
  },
  /**
   * transform
   * {
   *  field:'name',
   *  direction:'ASC'
   * }
   * to
   * 'name ASC'
   *
   *@Return {Array}
   */
  buildOrder: function (order) {
    var result = [];
    return result;
  },

  buildWhere: function (conds) {
    if (conds === null || conds === undefined || (typeof conds !== 'object')) {
      return;
    }
    var fields = this.extractFields(conds);
    for (var i = 0, l = fields.length; i < l; i++) {
      this.bindProperty(fields[i]);
    }
  },
  validateField: function (name) {
    var fields = this.get('fields');
    return fields.indexOf(name) > -1;
  },
  bindProperty: function (property) {
    var owner = this.get('owner');
    Ember.bind(this, 'owner.' + property, 'wherePair.' + property);
  },
  extractFields: function (where) {
    var self = this;
    var model = this.get('modelConstructor');
    var fields = [];
    var iterate = function (conds) {
      Object.keys(conds).forEach(function (key) {
        if (key === 'and' || key === 'or') {
          var clauses = conds[key];
          return clauses.map(function (c) {
            iterate(c);
          });
        }
        Ember.assert('The model:' + model.typeKey + ' does not contain the field:' + key, self.validateField(key));
        if (conds[key] && conds[key].constructor === Object) {
          var operator = Object.keys(conds[key])[0];
          Ember.assert('Invalid where operator type: ' + operator, $where.hasOwnProperty(operator));
        }
        if (fields.indexOf(key) == -1) {
          fields.push(key);
        }
      });
    };
    iterate(where);
    return fields;
  },
  assembleFields: function () {
    return '*';
  },
  assembleOrder: function () {
    return ['id ASC'];
  },
  assembleWhere: function () {
    var struct = this.get('whereStructure');
    var clone = Ember.$.extend(true, {}, struct);
    var wherePair = this.get('wherePair');
    var self = this;
    var flag = false;
    var iterate = function (conds, superior) {
      Object.keys(conds).forEach(function (key) {
        if (key === 'and' || key === 'or') {
          var clauses = conds[key];
          Ember.assert('The operator:' + key + ' must be an array', Ember.isArray(clauses));
          var removed = [];
          clauses.map(function (c) {
            iterate(c, key)
            if (flag) {
              removed.push(c);
            }
          });
          clauses.removeObjects(removed);
          if (clauses.length === 0) {
            delete conds[key];
          }
          return;
        }
        var value = wherePair[key];
        var hasOperator = false;
        var operator;

        if (value === UNDEFINED) {
          if (!superior) {
            delete conds[key];
          } else {
            flag = true;
          }
          return;
        }

        //operator
        if (conds[key] && conds[key].constructor.name === 'Object') {
          operator = Object.keys(conds[key])[0];

          var valueType = $where[operator];
          switch (valueType) {
            case VALUE:
              break;
            case ARRAY:
              value = value.split(DELIMITER);
              break;
            case STRING:
              value = value != UNDEFINED ? STRING.fmt(value) : value;
              break;
            case BETWEEN:
              //how to collect 2 params into between
              break;
          }
        }
        //set value
        key = self.keyForField(key, hasOperator ? conds[key][operator] : conds[key]);
        if (hasOperator) {
          conds[key][operator] = value;
        } else {
          conds[key] = value;
        }

        flag = false;
      });
    };
    iterate(clone);
    self = null;
    return clone;
  },
  keyForField: function (field, operatorValue) {
    return field;
  },

  fields: Ember.computed(function () {

  }),
  order: Ember.computed(function () {

  }),
  query: Ember.computed('fields', 'order', 'where', function () {
    var query = {};
    var fields = this.assembleFields();
    var order = this.assembleOrder();
    var where = this.assembleWhere();
    query['fields'] = fields;
    query['order'] = order;
    query['where'] = where;
    return query;
  }).readOnly().volatile()
});

//TODO render or generate filter according filter set
export default
AdvancedQuery;
/**
 * {
 *  username:{
 *    like:'SysUser'
 *  },
 *  and:[{
 *    price:{
 *      gt:'SysOrder'
 *    }
 *  }]
 * }
 * for more than one model
 *
 */
var ManyAdvancedQuery = AdvancedQuery.extend({
  /**
   * @Override
   * @param field
   * @param operatorValue
   * @returns {string}
   */
  keyForField: function (field, operatorValue) {
    return operatorValue + '.' + field;
  }
});
