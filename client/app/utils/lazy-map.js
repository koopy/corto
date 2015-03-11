import Ember from 'ember';
import config from 'app/config/environment';
import Router from '../router';
import acls from 'app/acl';
import resolveWildcard from 'app/utils/resolve-wildcard';

var appConfig = config.APP;
function normalizeAcl(acls){
  if(Ember.isArray(acls)){
    return acls.map(function (acl) {
      return {
        authCode: acl
      };
    });
  }
}
acls = normalizeAcl(acls);
/**
 * i18n:
 *  cn: use route/template if localePath can't find
 *
 * field:{
 * name://if not support ,use localPath
 * route/template
 * authCode
 * group
 * children
 * icon
 * localePath
 * }
 * mix locale with field.route
 */

var routemetas = resolveWildcard('app/routemetas/*').modules;
/**
 * calc acls with all route ,to get that :
 *  1.which route is match
 *  2.which route is unmatch
 *  3.how many acl is un match the whole current route
 *  4.config a flag to warn or assert
 *  5.should cascade ?
 *
 * @param container
 * @param application
 */
var t = null;
export default function lazyMap(container,application) {
  //TODO last args : acl ,get from the backend
  var session = container.lookup('simple-auth-session:main');
  var router = container.lookup('router:main');
  var currentUser = session.get('currentUser');
  var app = container.lookup('application:main');
  if(!t){
    t = container.lookup('utils:t');
  }
  //TODO make field :username config
  //TODO how to do when the user has no any permission
  Ember.assert('currentUser : ' + currentUser.get('username') + ' does not have  any permission', acls || (Ember.isArray(acls) && acls.length == 0));

  var routes = Ember.copy(routemetas, true);
  //TODO just for test
  var permission = Ember.copy(acls);
  if (appConfig.enableAuth === true) {
    routes = filterRoutes(routes, permission);
  }

  router.set('availableRoutes', routes);
  //TODO clear all routes
  Router.map(function () {
    this.resource('main', {path: '/'}, function () {
      var mapRoutes = function (routes, parent) {
        var context = this;
        if (Ember.isArray(routes)) {
          routes.forEach(function (route) {
            var type = route.type || 'resource',
              path = route.path,
              children = route.children,
              params = [];
            if (type == 'resource') {
              params.push(parent ? parent + '.' + route.template : route.template);
            } else {
              params.push(route.template);
            }

            params.push({ path: path || route.template});
            if (Ember.isArray(children) && children.length > 0) {
              params.push(function () {
                mapRoutes.call(this, children, this.parent);
              });
            }
            context[type].apply(context, params);
          });
        }
      }
      mapRoutes.call(this, routes);
    });
  });
  if(!Ember.BOOTED){
    application.advanceReadiness();
  }
}
//TODO how to resolve routes with acl
function filterRoutes(routes,acls,parent){
  var noPermittedRoutes = [];
  routes.forEach(function (route) {
    var children = route.children,
      permission = acls.filterProperty('authCode', route.authCode);
    if (permission.length > 1) {
      Ember.assert('The route:' + route.name + ' has been granted duplicate permission with :' + permission.join(','));
    }
    var isPermitted = permission.length == 1;
    if(!route.name){
      if (appConfig.enableI18n === true) {
        if (parent && parent.localePath && !route.localePath) {
          //join with parent
          route.localePath = parent.localePath + '.' + route.template;
        }
        route.localePath = route.localePath || route.template;
        try {
          route.name = t(route.localePath + '.name');
        } catch (e) {
          //Do nothing
        }
      }
      route.name = route.name || route.template;
    }

    acls.removeObjects(permission);
    if(appConfig.loggingEnabled && !isPermitted){
      Ember.Logger.info(route.name + ' is not permitted');
    }
    //check if parent does not have permission ,does child should have?
    //some route has no config the authCode
    //if not permitted and the authCode is not null
    if (!isPermitted && route.authCode) {
      noPermittedRoutes.push(route);
      if (appConfig.strict === true) {
        Ember.Logger.info('The Permission has enable strict mode, does not have the permission with ' + route.name + ' and the cascade children');
        return;
      }
    }
    if (Ember.isArray(children) && children.length > 0) {
      filterRoutes.call(null, children, acls,route);
    }
  });
  //keep all level route just clear not permitted routes
  routes.removeObjects(noPermittedRoutes);
  return routes;
}
