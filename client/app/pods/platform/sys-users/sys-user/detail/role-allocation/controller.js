/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ArrayController.extend({
  actions:{
    clearRelationship: function (relation, role) {
      relation.destroyRecord().then(function(){
        var relationTypes = role.get('relationTypes');
        var idx = relationTypes.indexOf(relation);
        relationTypes.replace(idx, 1,[null]);
      });
    }
  }
});
