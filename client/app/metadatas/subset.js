/**
 * Created by jiangwy on 15-3-7.
 */
import Ember from 'ember';

var get = Ember.get;
export default function(identity,columns){
  Ember.assert('The identity must not be empty',identity);
  Ember.assert('The columns must not be empty',columns);
  return ['checkbox', identity, 'operation'].map(function(f){
    var col = get(columns,f);
    Ember.assert('Can not get the column with field :',f);
    return col;
  });

}
