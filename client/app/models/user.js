import DS from 'ember-data';

var attr = DS.attr,
  hasMany = DS.hasMany;
export default DS.Model.extend({
  username:attr(),
  password:attr(),
  accessTokens:hasMany('access-token')
});
