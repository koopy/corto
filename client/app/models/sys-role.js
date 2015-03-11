import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr,
  belongsTo = DS.belongsTo,
  hasMany = DS.hasMany
  ;
var Model = Base.extend({
  name: attr(),
  description: attr(),
  created: attr('date'),
  modified: attr('date'),

  userRelations: hasMany('sysRoleRelation')
});

export default
Model;
