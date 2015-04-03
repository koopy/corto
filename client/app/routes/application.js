import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';
import Configuration from 'simple-auth/configuration';

var POPUP = 'popups',
  OpenEvent = 'open',
  separator = ' - ',
  get = Ember.get,
  a_slice = [].slice;
var t = null;
export default
Ember.Route.extend(ApplicationRouteMixin, {
  title: function (tokens) {
    /**
     * t('platform')  or t('platform.name')
     *
     * TODO the route meta is diff from the route define
     * does need to redefine it?
     *
     */
    var segments = [];
    if (Ember.FEATURES.isEnabled('ember-document-title')) {
      tokens = tokens.uniq().pop().split('.');
      if (tokens[tokens.length - 1] == 'index') {
        tokens.pop();
      }
      if (tokens[0] == 'main') {
        tokens.shift();
      }
      //filter main
      for (var i = 0, l = tokens.length; i < l; i++) {
        var seg = tokens.slice(0, i + 1);
        try {
          seg.push('name');
          segments.push(t(seg.join('.')));
        } catch (e) {
          seg.pop('name');
          segments.push(t(seg.join('.')));
          continue;
        }
      }
    }
    segments.unshift(t('title'));
    return segments.join(separator);
  },
  popups: null,
  init: function () {
    this._super();
    t = this.container.lookup('utils:t');
    this.set('popups', Ember.A());
  },
  pathForPopup: function (yieldName) {
    return POPUP + '/' + yieldName;
  },
  shouldStoreSource: function (dest, sender) {
    if (sender && get(sender, 'asSender') === true) {
      dest.set('triggerSource', sender);
      return true;
    }
    return false;
  },
  renderPopup: function (name, into, view, outlet, controller) {
    var popups = this.get('popups');
    popups.push({
      dialogName: name,
      into: into
    });

    this.render(name, {
      into: into,
      view: view,
      outlet: outlet,
      controller: controller
    });
  },
  actions: {
    sessionAuthenticationSucceeded: function () {
      this.store.find('sysAcl').then(function () {
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
    sessionInvalidationSucceeded: function () {
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
    sessionInvalidationFailed: function (error) {
      //TODO
    },

    httpError: function (e, xhr, options, thrownError) {
      console.log("httpError catch");
    },
    openPopup: function (yieldName) {
      var name = this.pathForPopup(yieldName);
      var controller = this.controllerFor(name);
      var popups = this.get('popups');
      if (popups.length > 0) {
        return this.send.apply(this, ['subPopup'].addObjects(arguments));
      } else {
        //do first
        var sender = a_slice.call(arguments, -1)[0];
        var hasSender = this.shouldStoreSource(controller, sender);
        var params = a_slice.call(arguments, 1, hasSender ? arguments.length - 1 : arguments.length);
        //sendEvent controller with open event
        Ember.sendEvent(controller, OpenEvent, params);

        return this.renderPopup(name, 'application', 'popup', 'popup', controller);
      }
    },
    closePopup: function () {
      var popups = this.get('popups');
      Ember.assert('Can not close popup without any popup exists', popups.length != 0);
      popups.pop();
      var lastConfig = popups[popups.length - 1];
      this.disconnectOutlet({
        outlet: 'popup',
        parentView: popups.length == 0 ? 'application' : lastConfig.dialogName
      });

    },
    ensure: function () {
      //default action
      this.send('closePopup');
    },
    subPopup: function (yieldName) {
      var name = this.pathForPopup(yieldName);

      var popups = this.get('popups');
      Ember.assert('Can not open sub popup in the root,it must be opened by parent popup', popups.length != 0);
      //get from last one
      var lastConfig = popups[popups.length - 1];
      var controller = this.controllerFor(name);
      var lastController = this.controllerFor(lastConfig.dialogName);
      var sender = a_slice.call(arguments, -1)[0];
      var hasSender = this.shouldStoreSource(lastController, sender);
      var params = a_slice.call(arguments, 1, hasSender ? arguments.length - 1 : arguments.length);
      Ember.sendEvent(controller, OpenEvent, params);

      return this.renderPopup(name, lastConfig.dialogName, 'popup', 'popup', controller);
    },
    logout: function () {
//      this.send('openPopup', 'confirm');

      var container = this.container;
      var app = container.lookup('application:main');
      this.send('invalidateSession');
      //TODO
    }
  }
});
