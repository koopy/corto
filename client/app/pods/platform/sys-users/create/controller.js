/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  actions:{
    rollback:function(){
      var model = this.get('model');
      var store = this.store;
      store.unloadRecord(model);
    },
    back:function(){
      this.transitionToRoute('platform.sysUsers.index');
    },
    submit:function(){
      var model = this.get('model');
      if(model.get('isValid')){
        model.save().then(function(record){
          self.transitionToRoute('platform.sysUsers.sysUser',record);
        });
      }
    }
  }

});
