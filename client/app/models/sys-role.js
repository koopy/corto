import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr;
var Model = Base.extend({
  name: attr(),
  description: attr(),
  created: attr('date'),
  modified: attr('date')
});

export default
Model;
