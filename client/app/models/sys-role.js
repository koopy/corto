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
  /*详细信息配置项，一定要配置在这里*/
  config:{
    isVisible:false,
    identity:{
      field:"name",
      name:"角色"
    },
    detail:{
      profile: {
        name: "基本信息",
        active:true
      },
      roleAllocation: {
        name: "资源授权"
      },
      organization: {
        name: "角色分配"
      }
    }
  },
  checkbox:{
    columnWidth: 50,
    textAlign:"text-align-center",
    headerCellViewClass:'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  name: {
    headerCellName: '角色名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    headerCellName: '角色描述',
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
