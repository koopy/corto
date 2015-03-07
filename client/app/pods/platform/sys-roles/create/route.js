/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default Ember.Route.extend({
  model:function(){
    return this.store.createRecord('sysRole');
  },
  resetController: function (controller, isExiting, transition) {
    if (isExiting) {
      controller.send('rollback');
    }
  }
});
