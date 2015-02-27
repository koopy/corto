import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr;
var Model = Base.extend({
  name: attr('string')
});
export default
Model;
