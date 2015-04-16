import Ember from 'ember';
import Session from 'simple-auth/session';
import lazyMap from 'corto/utils/lazy-map';
import Configuration from 'simple-auth/configuration';

export function initialize(container, application) {
  application.deferReadiness();
  Session.reopen({
    restore:function(){
      return this._super().then(function(){
        lazyMap(container,application,['sys:user:create_user','sys:user:delete_user']);
      },function(){
        var router = container.lookup('router:main');
        router.set('initialURL',Configuration.authenticationRoute);
        application.advanceReadiness();
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
