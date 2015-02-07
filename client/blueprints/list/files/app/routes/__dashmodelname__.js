import Ember from 'ember';

export default Ember.Route.extend({
  model:function(params){
    return this.store.find('<%=modelName%>',params.<%=modelName%>_id).catch(function(){

    }.bind(this));
  }
});
