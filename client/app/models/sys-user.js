import DS from 'ember-data';
import Base from './base';

var attr = DS.attr,
 belongsTo = DS.belongsTo,
  hasMany = DS.hasMany
  ;
var Model = Base.extend({
  nickname: attr(),
  password:attr(),
  sex:attr('boolean'),
  email:attr(),
  phone:attr(),
  telephone:attr(),
  homeTel:attr(),
  address:attr(),
  username: attr(),
  status: attr('boolean'),
  modified: attr('pretty-date'),

  //relation definition
  userRelations:hasMany('sysUserRelation'),

  validations: {
    nickname: {
      presence: true,
      uniqueness:function(){
        return {
          message:"用户名已存在，请重新输入"
        };
      }
    }
  }
});
Model.columns = {
  /*详细信息配置项，一定要配置在这里*/
  config:{
    isVisible:false,
    identity:{
      field:"username",
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
    columnWidth: 50,
    textAlign:"text-align-center",
    headerCellViewClass:'checkbox-header',
    tableCellViewClass: 'checkbox-cell'
  },
  nickname: {
    headerCellName: '用户名',
    columnWidth: 100,
    contentPath: 'nickname',
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
  username: {
    headerCellName: '账号',
    columnWidth: 100,
    contentPath: 'username'
  },
  sex: {
    headerCellName: '性别',
    columnWidth: 100,
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
  phone: {
    headerCellName: '手机号码',
    columnWidth: 100,
    contentPath: 'phone',
    isVisible: false,
    formOptions: {

    }
  },
  telephone: {
    headerCellName: '办公室电话',
    columnWidth: 100,
    contentPath: 'telephone',
    isVisible: false,
    formOptions: {

    }
  },
  status: {
    headerCellName: '状态',
    columnWidth: 100,
    contentPath: 'status',
    formOptions: {
      type: 'radio'
    }
  },
  homeTel: {
    headerCellName: '家庭电话',
    columnWidth: 100,
    contentPath: 'homeTel',
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
  modified: {
    headerCellName: '最后修改时间',
    columnWidth: 100,
    contentPath: 'modified',
    showInForm:false
  },
  operation: {
    headerCellName: '操作',
    columnWidth: 100,
    textAlign:"text-align-center",
    tableCellViewClass: 'operation-cell'
  }
};

export default
Model;
