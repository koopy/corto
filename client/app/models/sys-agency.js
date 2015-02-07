import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr;
var Model = Base.extend({
  name: attr(),
  description: attr(),
  created: attr('pretty-date'),
  modified: attr('pretty-date')
});
Model.columns = {
  name: {
    headerCellName: '机构名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    headerCellName: '机构描述',
    columnWidth: 100,
    contentPath: 'description'
  },
  created: {
    headerCellName: '创建时间',
    columnWidth: 100,
    contentPath: 'created'
  },
  modified: {
    headerCellName: '最后修改时间',
    columnWidth: 100,
    contentPath: 'modified'
  },
  operation: {
    headerCellName: '操作',
    columnWidth: 100,
    tableCellViewClass:'operation-cell'
  }
};

export default
Model;
