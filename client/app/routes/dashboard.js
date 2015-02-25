import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Configuration from 'simple-auth/configuration';

export default Ember.Route.extend(AuthenticatedRouteMixin,{
  actions:{
    sessionInvalidationSucceeded: function() {
      if (!Ember.testing) {
        this.transitionTo(Configuration.authenticationRoute);
      }
    },

    /**
     This action is invoked whenever session invalidation fails. This mainly
     serves as an extension point to add custom behavior and does nothing by
     default.

     @method actions.sessionInvalidationFailed
     @param {any} error The error the promise returned by the authenticator rejects with, see [`Authenticators.Base#invalidate`](#SimpleAuth-Authenticators-Base-invalidate)
     */
    sessionInvalidationFailed: function(error) {
      //TODO
    }
  }
});
