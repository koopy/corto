import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Configuration from 'simple-auth/configuration';

var DIALOG = 'dialog',
  get  = Ember.get,
  a_slice = [].slice;

export default
Ember.Route.extend(ApplicationRouteMixin,{
  dialogs: null,
  init:function(){
    this._super();
    this.set('dialogs',Ember.A());
  },
  pathForDialog:function(yieldName){
    return DIALOG + '/' + yieldName;
  },
  actions: {
    sessionAuthenticationSucceeded:function(){
      this.store.find('sysAcl').then(function(){
        var attemptedTransition = this.get(Configuration.sessionPropertyName).get('attemptedTransition');
        if (attemptedTransition) {
          attemptedTransition.retry();
          this.get(Configuration.sessionPropertyName).set('attemptedTransition', null);
        } else {
          this.transitionTo(Configuration.routeAfterAuthentication);
        }
        //TODO get acl from backend
        //TODO router.map authority routes
        //TODO
      }.bind(this));
    },
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
    },

    httpError: function (e, xhr, options, thrownError) {
      console.log("httpError catch");
    },
    openModal: function (yieldName, modelType) {
      var name = this.pathForDialog(yieldName);
      var controller = this.controllerFor(name);
      //sendEvent controller with open event
      Ember.sendEvent(controller,'open',[modelType]);

      var sender = a_slice.call(arguments, -1)[0];
      if (sender && get('sender', 'asSender') === true){
        controller.set('triggerSource',sender);
      }
      var dialogs = this.get('dialogs');
      dialogs.push({
        dialogName: name,
        into: 'application'
      });
      return this.render(name, {
        into: 'application',
        view: 'modal',
        outlet: 'modal',
        controller: controller
      });

    },
    closeModal: function () {
      var dialogs = this.get('dialogs');
      Ember.assert('Can not close modal without any modal exists', dialogs.length != 0);
      dialogs.pop();
      var lastConfig = dialogs[dialogs.length - 1];
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: dialogs.length == 0 ? 'application' : lastConfig.dialogName
      });

    },
    ensure: function () {
      //default action
      this.send('closeModal');
    },
    subModal: function (yieldName) {
      var name = this.pathForDialog(yieldName);

      var dialogs = this.get('dialogs');
      Ember.assert('Can not open sub modal in the root,it must be opened by parent modal', dialogs.length != 0);
      //get from last one
      var lastConfig = dialogs[dialogs.length - 1];
      var controller = this.controllerFor(name);
      //sendEvent controller with open event
      var lastController = this.controllerFor(lastConfig.dialogName);
      Ember.sendEvent(controller,'open',[lastController]);

      //set current dialog to last one
      dialogs.push({
        dialogName: name,
        into: lastConfig.dialogName
      });

      this.render(name,{
        into: lastConfig.dialogName,
        view: 'modal',
        outlet: 'modal',
        controller: controller
      });
    },
    logout: function () {
//      this.send('openModal', 'confirm');

      var container = this.container;
      var app = container.lookup('application:main');
      this.send('invalidateSession');
      //TODO
    }
  }
});
