import Ember from 'ember';
import Session from 'simple-auth/session';
import lazyMap from 'app/utils/lazy-map';

export function initialize(container, application) {
  Session.reopen({
    restore:function(){
      return this._super().then(function(){
        lazyMap(container,application,['sys:user:create_user','sys:user:delete_user']);
      });
    },
    currentUser: function () {
      var payload = this.get('content.user');
      if(payload){
        return this.container.lookup('store:main').push('user', Ember.copy(payload));
      }else{
        return null;
      }
    }.property('content')
  });
}


export default {
  name: 'reopen-session',
  before:'simple-auth',
  initialize: initialize
};
