/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  actions:{
    edit:function(){
      this.transitionToRoute('platform.sysUsers.sysUser.edit');
    }
  }

});
