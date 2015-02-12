import DS from 'ember-data';
import Base from './base';

var attr = DS.attr,
  belongsTo = DS.belongsTo,
  hasMany = DS.hasMany
  ;
var Model=Base.extend({
  code: attr('string'),
  name: attr('string'),
  status: attr('string'),
  description: attr('string'),
  created: attr('string'),
  creator: attr('string'),
  modified: attr('string'),
  modifier: attr('string'),
//relation definition
  userRelations:hasMany('sysUserRelation'),
	validations: {
		code: {
			length: { maximum: 50 },
      presence: { message: '群组代码不能为空' },
			format: { with: /^[a-zA-Z_]+$/, message: '群组代码只能由英文字母和下划线组成' }
		},
		name: {
			length: { maximum: 50 },
			presence: { message: '群组名称不能为空' }
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
      name:"群组"
    },
    detail:{
      profile: {
        name: "基本信息",
        active:true
      },
      groupMember: {
        name: "群组成员"
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
		headerCellName: '群组代码',
		columnWidth: 100,
		contentPath: 'code'
	},
	name: {
		headerCellName: '群组名称',
		columnWidth: 100,
		contentPath: 'name'
	},
	description: {
		headerCellName: '描述',
		columnWidth: 100,
		contentPath: 'description'
	},
	status: {
		headerCellName: '群组状态',
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
