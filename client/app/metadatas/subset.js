/**
 * Created by jiangwy on 15-3-7.
 */
import Ember from 'ember';

var get = Ember.get;
export default function(subset,columns){
  Ember.assert('The subset must not be empty', subset.length > 0);
  Ember.assert('The columns must not be empty', columns);
  return subset.map(function (f) {
    var col = get(columns,f);
    Ember.assert('Can not get the column with field :',f);
    return col;
  });

}
