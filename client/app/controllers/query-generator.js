/**
 * Created by jiangwy on 15-3-21.
 */
import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';

var get = Ember.get;
var set = Ember.set;
export default
Ember.Controller.extend({
  columns: Ember.computed(function () {
    var relation = {
      columnWidth: 100,
      headerCellName: 'Relationship',
      tableCellViewClass:'generator/relation',
      getCellContent: function () {

      },
      setCellContent: function () {

      }
    };
    var field = {
      columnWidth: 100,
      headerCellName: 'Field',
      tableCellViewClass:'generator/field',
      getCellContent: function () {

      },
      setCellContent: function () {

      }
    };
    var operator = {
      columnWidth: 100,
      headerCellName: 'Operator',
      tableCellViewClass:'generator/operator',
      getCellContent: function () {

      },
      setCellContent: function () {

      }
    };
    return [relation, field, operator].map(function (options) {
      return ColumnDefinition.create(options);
    });
  })
});
