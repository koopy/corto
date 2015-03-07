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

export default
Model;
