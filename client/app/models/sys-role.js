import DS from 'ember-data';
import Base from "./base";
import {columns,config} from '../model-configs/sys-role';

var attr = DS.attr;
var Model = Base.extend({
  name: attr(),
  description: attr(),
  created: attr('date'),
  modified: attr('date')
});
Model.columns = columns;
Model.config = config;
export default
Model;
