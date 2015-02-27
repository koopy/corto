import Ember from 'ember';
import config from './config/environment';
import Configuration from 'simple-auth/configuration';

var set = Ember.set;
var Router = Ember.Router.extend({
  location: config.locationType,
  _doURLTransition: function (routerJsMethod, url) {
    //TODO how to do better
    var transition = this.router[routerJsMethod](url || '/'),
      container = this.container,
      session = container.lookup('simple-auth-session:main'),
      applicationRoute = container.lookup('route:application');
    transition.then(null, function (error) {
      if (!error || !error.name) {
        return;
      }
      if (error.name === "UnrecognizedURLError") {
        if (session.get('isAuthenticated')) {
          Ember.assert("The URL '" + error.message + "' did not match any routes in your application");
        } else {
          applicationRoute.transitionTo(Configuration.authenticationRoute);
        }
      }
      return error;
    }, 'Ember: Process errors from Router');
    return transition;
  },
  sidebarRoutes: function () {
    var routes = filterRoutesByGroup(this.get('availableRoutes')[0].children, 'sidebar');
    var localization = function (r) {
      r.forEach(function (item) {
        item.name = t('sidebar.' + item.template + '.name');
        if (item.children && item.children.length>0) {
          localization(item.children);
        }
      });
    }
    var container = this.container;
    var t = container.lookup('utils:t');
    localization(routes);
    return routes;
  }.property('availableRoutes')
});
function filterRoutesByGroup(routes, group, parent) {
  var result = [];
  routes = Ember.copy(routes, true);
  if (Ember.isArray(routes)) {
    routes.forEach(function (route) {
      if (route.group === group) {
        if (parent) {
          route.template = parent + '.' + route.template
        }
        result.push(route);
        if (Ember.isArray(route.children) && route.children.length > 0) {
          route.children = filterRoutesByGroup(route.children, group, route.template);
        }
      }
    });
  }
  return result;
}
Router.map(function () {
  this.route('login');
  this.resource('main', {path: '/'});
});

export default
Router;
