import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  findAllRoles:function(store,type,filter){
    return this.ajax(this.appendURL(type.typeKey, "findAllRoles"), "GET", {data: {filter:filter}});
  }
});
