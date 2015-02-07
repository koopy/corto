import DS from 'ember-data';
import Base from './base';

var attr = DS.attr,
  belongsTo = DS.belongsTo,
  hasMany = DS.hasMany
  ;
var Model=Base.extend({
  code: attr(),
  name: attr(),
  description: attr(),
  status: attr(),
  modified: attr('pretty-date'),
//relation definition
  userRelations:hasMany('sysUserRelation'),
  validations: {
    code: {
      length: { maximum: 50 },
      presence: { message: '岗位代码不能为空' },
      format: { with: /^[a-zA-Z_]+$/, message: '岗位代码只能由英文字母和下划线组成' }
    },
    name: {
      length: { maximum: 50 },
      presence: { message: '岗位名称不能为空' }
    },
    description: {
      length: { maximum: 300 }
    }
  }
});

Model.columns = {
  config:{
    isVisible:false,
    identity:{
      field:"name",
      name:"岗位"
    },
    detail:{
      profile: {
        name: "基本信息",
        active:true
      },
      groupMember: {
        name: "岗位成员"
      }
    }
  },
  checkbox: {
    columnWidth: 50,
    textAlign: 'text-align-center',
    headerCellViewClass: 'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  code: {
    headerCellName: '岗位代码',
    columnWidth: 100,
    contentPath: 'code'
  },
  name: {
    headerCellName: '岗位名称',
    columnWidth: 100,
    contentPath: 'name'
  },
  description: {
    headerCellName: '描述',
    columnWidth: 100,
    contentPath: 'description'
  },
  status: {
    headerCellName: '岗位状态',
    columnWidth: 100,
    contentPath: 'status'
  },
  modified: {
    headerCellName: '修改时间',
    columnWidth: 100,
    contentPath: 'modified'
  },
  operation: {
    headerCellName: '操作',
    columnWidth: 100,
    textAlign: 'text-align-center',
    tableCellViewClass: 'operation-cell'
  }
};

export default
Model;
