import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    findRolesByUser:function(store,type,filter){
    return this.ajax(this.appendURL(type.typeKey, "findRolesByUser"), "GET", {data: {filter:filter}});
  }
});
