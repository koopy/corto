import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr;
var Model = Base.extend({
  name: attr(),
  code: attr(),
  description:attr(),
  created:attr('date'),
  modified: attr('date')
});
Model.columns = {
  config:{
    isVisible:false,
    identity:{
      field:"name",
      name:"职务"
    },
    detail:{
      profile: {
        name: "基本信息",
        active:true
      }
    }
  },
  name: {
    headerCellName: '职务名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  code: {
    headerCellName: '职务代码',
    columnWidth: 100,
    contentPath: 'code'
  },
  description: {
    headerCellName: '描述',
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
  }
};

export default
Model;
