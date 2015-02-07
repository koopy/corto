import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
var get = Ember.get;

function createMixin(model) {
  var field = model.columns.config.identity.field;
  return Ember.Mixin.create({
    init: function () {
      this._super();
      this.set('selection', Ember.A());
      var args={};
      args.status = null;
      args[field] = null;
      this.set('args', args);
      Ember.oneWay(this,"content.args","args");
    },
    statusDidChange:function(){
      var status = this.get('status');
      this.set('args.status',status);
      this.set('args',Ember.copy(this.get('args')));
    }.observes('status'),
    statusContent: [
      {name: "全部", key: 1},
      {name: "启用", key: 2},
      {name: "禁用", key: 3}
    ],
    removeUndefined: function (array) {
      if (Ember.isArray(array)) {
        for (var i = 0, l = array.length; i < l; i++) {
          if (!array[i]) {
            array.splice(i, 1);
            i--;
          }
        }
      }
      return array;
    },
    queryParams: ['page', 'perPage', 'limit'],

    // set default values, can cause problems if left out
    // if value matches default, it won't display in the URL
    page: 1,
    perPage: 10,
    limit: Ember.computed.alias('perPage'),
    pageBinding: 'content.page',
    perPageBinding: 'content.perPage',
    totalPagesBinding: 'content.totalPages',

    pageDidChange:function(){
      this.get('selection').clear();
    }.observes('page'),
    columns: function () {
      var modelColumns = model.columns;
      Ember.assert('The Model : ' + model + 'does not config columns', modelColumns);
      var ret = [];
      for (var fieldName in modelColumns) {
        var column = modelColumns[fieldName];
        if (column.isVisible === false || fieldName === "detail") {
          continue;
        }
        var columnWidth = column.columnWidth;
        if (columnWidth <= 0 || !columnWidth) {
          column.columnWidth = 100;
        }
        if (!column.contentPath) {
          column.contentPath = fieldName;
        }
        if (!column.headerCellName) {
          column.headerCellName = fieldName;
        }
        if (!column.getCellContent) {
          column.getCellContent = (function (fieldName) {
            return  function (row) {
              return row.get(fieldName);
            };
          })(fieldName);
        }
        ret.push(ColumnDefinition.create(column));
      }
      return ret;
    }.property(),
    actions: {
      delBatch: function (modalName) {
        var selection = this.get('selection');
        if (selection.length > 0) {
          selection = selection.map(function(item){
            if(item){
              return item.get('content');
            }
          });
          selection = this.removeUndefined(selection);
          if (selection.length > 0) {
            return this.send('openModal', modalName, selection);
          }
        }
      },
      enter: function (name) {
        var status = this.get('status');
        var nameArgs = {};
        nameArgs[field] = {
          like: '%' + name + '%'
        };
        this.set('args',Ember.merge({
          status:status
        },nameArgs));
      }
    }
  });
}

export default
function (model) {
  Ember.assert('PagedArray Mixin must provide the corresponding model', model);

  return createMixin(model);
}