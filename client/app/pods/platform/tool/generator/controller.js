/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
import resolveWildcard from 'app/utils/resolve-wildcard';

var get = Ember.get;
var set = Ember.set;

var allModels = resolveWildcard('app/models/*');
var names = allModels.names;
var modules = allModels.modules;
var normalized={};
var modelPairs = [];
for (var i = 0, l = names.length; i < l; i++) {
  var name = names[i];
  var cur = {};
  cur.key = name;
  cur.value = name;
  modelPairs.push(cur);
  normalized[name] = modules[i];
}
function map2Pair(map) {
  var result = [];
  for (var op in map) {
    var cur = {};
    cur.key = op;
    cur.value = map[op];
    result.push(cur);
  }
  return result;
}

var relationMapping = {
  and:'AND',
  or:'OR'
}
var relations=map2Pair(relationMapping);
var comparator = {
  nlike: 'NOT LIKE',
  like: 'LIKE',
  gt: '>',
  gte: '>=',
  lt: '<',
  lte: '<=',
  inq: 'IN'
};
var operators =map2Pair(comparator);


export default
Ember.ArrayController.extend({
  init: function () {
    this._super();
    this.set('selection', Ember.A());
    this.set('modelPairs', modelPairs);
    this.set('allModels', normalized);
  },
  selectedModel: null,
  operators: function () {
    return operators;
  }.property(),
  relations: function () {
    return relations;
  }.property(),
  fields: function () {
    var allModels = this.get('allModels');
    var model = allModels[this.get('selectedModel')];
    if (model) {
      var fields = get(model, 'fields');
      var result = [];
      fields.forEach(function (key, value) {
        if (key === 'attribute') {
          result.push(value);
        }
      });
      return result;
    }
  }.property('selectedModel'),
  columns: Ember.computed(function () {
    var relation = {
      columnWidth: 100,
      textAlign: 'text-align-center',
      headerCellName: 'Relationship',
      tableCellViewClass: 'generator/relation',
      getCellContent: function (row) {
        return row.get('relation');
      },
      setCellContent: function (row, value) {
        row.set('relation', relationMapping[value]);
      }
    };
    var field = {
      columnWidth: 100,
      textAlign: 'text-align-center',
      headerCellName: 'Field',
      tableCellViewClass: 'generator/field',
      getCellContent: function (row) {
        return row.get('field');
      },
      setCellContent: function (row, value) {
        row.set('field', value);
      }
    };
    var operator = {
      columnWidth: 100,
      textAlign: 'text-align-center',
      headerCellName: 'Operator',
      tableCellViewClass:'generator/operator',
      getCellContent: function (row) {
        return row.get('operator');
      },
      setCellContent: function (row,value) {
        row.set('operator',comparator[value]);
      }
    };
    return [relation, field, operator].map(function (options) {
      return ColumnDefinition.create(options);
    });
  }),
  actions:{
    addRow:function(){
      this.pushObject({
        relation:'',
        field:'',
        operator:''
      });
    },
    'delete':function(){

    },
    generate:function(){
      this.set('filters','Generated!');
    }
  }
});
