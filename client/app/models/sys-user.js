import DS from 'ember-data';
import Base from './base';
import {columns,config} from '../model-configs/sys-user';

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
Model.columns = columns;
Model.config = config;
export default
Model;
