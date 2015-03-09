import DS from 'ember-data';
import Relation from './relation';

var attr = DS.attr,
  belongsTo = DS.belongsTo,
  hasMany = DS.hasMany;
export default DS.Model.extend({
  principalType: attr(),
  principalId: attr(),
  objectId: attr(),
  created: attr('date'),

  //master
  sysUser: belongsTo('sysUser'),
  sysGroup: belongsTo('sysGroup'),
  //slave
  sysPosition: belongsTo('sysPosition')
});
