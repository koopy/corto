import Ember from 'ember';
import Router from '../router';
import acls from 'app/acl';
import resolveWildcard from 'app/utils/resolve-wildcard';

var config = {
  strict: true,
  loggingDisabled: true,
  enableAuth: true
};
acls = acls.map(function (acl) {
  return {
    authCode: acl
  };
});
var routemetas = resolveWildcard('app/routemetas/*');
routemetas = routemetas.modules;
var root = {
  name : '首页',
  template : 'main',
  path : '/',
  authCode : 'main',
  children: routemetas
};
export default function lazyMap(container,application) {
  var session = container.lookup('simple-auth-session:main');
  var router = container.lookup('router:main');
  var currentUser = session.get('currentUser');
  //TODO make field :username config
  Ember.assert('currentUser : ' + currentUser.get('username') + ' does not have  any permission', acls || (Ember.isArray(acls) && acls.length == 0));

  var routes = Ember.copy([root], true);
  //TODO just for test
  var permission = Ember.copy(acls);
  if(currentUser.get('username')=='jwy'){

  }else{
    if (config.enableAuth === true) {
      routes = filterRoutes(routes, permission);
    }
  }
//  if (config.enableAuth === true) {
//    routes = filterRoutes(routes, acls);
//  }

  router.set('availableRoutes', routes);
  var sidebarRoutes = router.get('sidebarRoutes');
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
      mapRoutes.call(this, routes[0].children);
    });
  });
}
//TODO how to resolve routes with acl
function filterRoutes(routes,acls){
  var noPermittedRoutes = [];
  routes.forEach(function (route) {
    var children = route.children,
      permission = acls.filterProperty('authCode', route.authCode),
      isPermitted = permission.length == 1;
    acls.removeObjects(permission);
    if(config.loggingDisabled && !isPermitted){
      Ember.Logger.info(route.name + ' is not permitted');
    }
    //check if parent does not have permission ,does child should have?
    if (!isPermitted && route.authCode) {
      noPermittedRoutes.push(route);
      if (config.strict === true) {
        Ember.Logger.info('The Permission has enable strict mode, does not have the permission with ' + route.name + ' and the cascade children');
        return;
      }
    }
    if (Ember.isArray(children) && children.length > 0) {
      filterRoutes.call(null, children, acls);
    }
  });
  routes.removeObjects(noPermittedRoutes);
  return routes;
}
