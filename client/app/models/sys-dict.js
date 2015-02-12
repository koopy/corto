import DS from 'ember-data';
import Base from "./base";

var attr = DS.attr;
var Model = Base.extend({
  type: attr('string'),
  code: attr('string'),
  name: attr('string'),
  orderNo: attr('string'),
  status: attr('string'),
  description: attr('string'),
  created: attr('date'),
  creator: attr('string'),
  modified: attr('date'),
  modifier: attr('string')
});
export default
Model;
