/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  actions:{
    back:function(){
      this.transitionToRoute('sysUsers.index');
    },
    edit:function(){
      this.transitionToRoute('sysUser.edit');
    }
  }

});
