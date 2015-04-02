import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
import resolveWildcard from '../utils/resolve-wildcard';
import subset from '../metadatas/subset';
import applyTransforms from '../utils/apply-transforms';

var get = Ember.get;
var modelConfigs = resolveWildcard('app/model-configs/*');

var modules = modelConfigs.modules;
var names = modelConfigs.names;
export
function initialize(container, application) {
  var t = container.lookup('utils:t');

  function createColumn(modelColumns, localizePrefix) {
    var cache = {};
    var collections = [];
    for (var fieldName in modelColumns) {
      var column = modelColumns[fieldName];
      if (column.isVisible === false) {
        continue;
      }
      var columnWidth = column.columnWidth;
      if (columnWidth <= 0 || !columnWidth) {
        column.columnWidth = 100;
      }
      if (!column.contentPath) {
        column.contentPath = fieldName;
      }
      if (!column.headerCellName && !column.disableLocale) {
        column.headerCellName = t(localizePrefix + '.' + fieldName);
      }

      if (!column.getCellContent) {
        column.getCellContent = function (row) {
          var contentPath = this.get('contentPath');
          var dataType = this.get('dataType');
          return applyTransforms(dataType || 'string', row.get(contentPath));
        };
      }
      var definition = ColumnDefinition.create(column);
      collections.push(definition);
      cache[fieldName] = definition;
    }
    return {
      collections: collections.sort(function(item1,item2){
        return item1.get('order') - item2.get('order');
      }),
      cache: cache
    };
  }

  modules.forEach(function (m, idx) {
    var columns = m.columns;
    var config = m.config;
    var subsetFields = ['checkbox', config.identity.field, 'operation'];
    if (config.subsetFields && config.subsetFields.length > 0) {
      subsetFields = config.subsetFields;
    }
    var localizePrefix = config.columnOptions && config.columnOptions.localizePrefix;
    Ember.assert('The localize prefix must not be null', localizePrefix);
    var name = names[idx];
    name = name.split('/').pop();
    var model = container.lookupFactory('model:' + name);
    var result = createColumn(columns,localizePrefix);
    model.reopenClass({
      columns: columns,
      columnDefinitions: result.collections,
      config: config,
      subset: subsetFields,
      subsetDefinitions: subset(subsetFields, result.cache)
    });
  });
}

export default {
  name: 'localize-column',
  after:'t',
  initialize: initialize
};
