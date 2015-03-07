import Ember from 'ember';

export default Ember.Route.extend({
  model:function(params){
    return this.store.find('sysRole',params.sysRole_id).catch(function(){

    }.bind(this));
  }
});
