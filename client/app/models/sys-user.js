import DS from 'ember-data';
import Base from './base';

var attr = DS.attr,
 belongsTo = DS.belongsTo,
  hasMany = DS.hasMany
  ;
var Model = Base.extend({
  orgId: attr('string'),
  deptId: attr('string'),
  name: attr('string'),
  account: attr('string'),
  password: attr('string'),
  sex: attr('string'),
  status: attr('string'),
  email: attr('string'),
  address: attr('string'),
  officePhone: attr('string'),
  homePhone: attr('string'),
  mobile: attr('string'),
  description: attr('string'),
  created: attr('date'),
  creator: attr('string'),
  modified: attr('string'),
  modifier: attr('date'),

  //relation definition
  userRelations:hasMany('sysUserRelation'),

  validations: {
    nickname: {
      presence: true,
      uniqueness: function () {
        return {
          validateOnNew: true,
          message:'The nickname has been exists'
        }
      }
    }
  }
});
Model.columns = {
  /*详细信息配置项，一定要配置在这里*/
  config:{
    isVisible:false,
    identity:{
      field:"name",
      name:"用户"
    },
    detail:{
      profile: {
        name: "基本信息",
        active:true
      },
      roleAllocation: {
        name: "角色分配"
      },
      organization: {
        name: "组织信息"
      }
    }
  },
  checkbox:{
    columnWidth: '10%',
    textAlign:"text-align-center",
    headerCellViewClass:'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  name: {
    headerCellName: '用户名',
    columnWidth: '10%',
    contentPath: 'name',
    formOptions: {

    }
  },
  password: {
    headerCellName: '密码',
    columnWidth: 100,
    contentPath: 'password',
    isVisible: false,
    formOptions: {
      type: 'password'
    }
  },
  account: {
    headerCellName: '账号',
    columnWidth: '10%',
    contentPath: 'account'
  },
  sex: {
    headerCellName: '性别',
    columnWidth: '10%',
    contentPath: 'sex',
    formOptions: {
      type: 'radio'
    }
  },
  email: {
    headerCellName: '邮箱',
    columnWidth: 100,
    contentPath: 'email',
    isVisible: false,
    formOptions: {
      type: 'email'
    }
  },
  officePhone: {
    headerCellName: '办公室电话',
    columnWidth: 100,
    contentPath: 'officePhone',
    isVisible: false,
    formOptions: {

    }
  },
  status: {
    headerCellName: '状态',
    columnWidth: '10%',
    contentPath: 'status',
    formOptions: {
      type: 'radio'
    }
  },
  homePhone: {
    headerCellName: '家庭电话',
    columnWidth: 100,
    contentPath: 'homePhone',
    isVisible: false,
    formOptions: {

    }
  },
  mobile: {
    headerCellName: '手机',
    columnWidth: 100,
    contentPath: 'mobile',
    isVisible: false,
    formOptions: {

    }
  },
  address: {
    headerCellName: '家庭地址',
    columnWidth: 100,
    contentPath: 'address',
    isVisible: false,
    formOptions: {

    }
  },
  description: {
    headerCellName: '描述',
    columnWidth: 100,
    contentPath: 'description',
    isVisible: false,
    formOptions: {
      type: 'textarea'
    }
  },
  created:{
    headerCellName: '创建时间',
    columnWidth: '20%',
    contentPath: 'created',
    showInForm:false
  } ,
  creator:{
    headerCellName: '创建者',
    columnWidth: '10%',
    contentPath: 'creator',
    showInForm:false
  },
  modifier: {
    headerCellName: '最后修改人',
    columnWidth: 100,
    isVisible:false,
    contentPath: 'modifier',
    showInForm:false
  },
  modified: {
    headerCellName: '最后修改时间',
    columnWidth: 100,
    isVisible:false,
    contentPath: 'modified',
    showInForm:false
  },
  operation: {
    headerCellName: '操作',
    columnWidth: '10%',
    textAlign:"text-align-center",
    tableCellViewClass: 'operation-cell'
  }
};

export default
Model;
