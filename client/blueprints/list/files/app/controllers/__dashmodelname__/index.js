/**
 * Created by weiyang on 15-1-13.
 */
import Ember from 'ember';

export default
Ember.ObjectController.extend({
  actions:{
    back:function(){
      this.transitionToRoute('<%=pluralmodelname%>.index');
    },
    edit:function(){
      this.transitionToRoute('<%=modelName%>.edit');
    }
  }

});
