/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  actions:{
    back:function(){
      this.transitionToRoute('platform.sysUsers.index');
    },
    edit:function(){
      this.transitionToRoute('platform.sysUsers.sysUser.edit');
    }
  }

});
