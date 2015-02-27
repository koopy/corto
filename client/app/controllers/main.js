import Ember from 'ember';

var get = Ember.get;
var set = Ember.set;
/**
 * 1.根据默认设定的路由规则，解析出当前的针对模型
 * 2.正常路由规则如下：
 *    platform.sysUsers.index                   首页->平台管理->用户管理->用户列表
 *    platform.sysUsers.loading                 首页->平台管理->用户管理->加载中
 *    platform.sysUsers.sysUser.index           首页->平台管理->用户管理->详细信息
 *    platform.sysUsers.sysUser.roleAllocation  首页->平台管理->用户管理->角色分配
 *
 * 3. <modelName>.index:详细信息
 *    <modelName>.<roleAllocation>:角色分配
 *    <modelName>(plural).index <模型>管理-><模型>列表
 */

var identifier = "template";
var exp = {
  create: '新建'
};
function findRouteMap(path, routeMaps) {
  var ret = [], cache = routeMaps;
  if (Ember.isArray(routeMaps)) {
    var segment = path.split('.');
    for (var k = 0, kl = segment.length; k < kl; k++) {
      var currentPath = segment[k];
      if (currentPath == 'index') {
        continue;
      }
      if (currentPath == 'loading') {
        ret.push({
          routeName: 'loading',
          name: '加载中'
        });
        continue;
      }

      for (var i = 0, l = cache.length; i < l; i++) {
        var cur = cache[i];
        if (cur[identifier] == currentPath) {
          //TODO 详细信息如何映射
          ret.push({
            routeName: currentPath,
            name: cur.name || exp[currentPath] || currentPath
          });
          if (cur.children && cur.children.length > 0) {
            cache = cur.children;
          }
          break;
          //TODO does it need other meta data
          //TODO how to resolve un matched
        }
      }
    }
  }
  return ret;
}

export default Ember.Controller.extend({
  needs: ['application'],
  breadcrumbs: function () {
    var currentPath = this.get('controllers.application.currentPath'),
      availableRoutes = this.get('target.availableRoutes'),
      breads = [];
    if (Ember.isArray(availableRoutes) && availableRoutes.length > 0) {
      breads = findRouteMap(currentPath, availableRoutes[0].children);
    }
    return breads;
  }.property('controllers.application.currentPath', 'target.availableRoutes'),
  actions: {
    setLang: function (language) {
      var application = this.container.lookup('application:main');
      set(application, 'locale', language);
      Ember.$.cookie('lang', language);
      location.reload();
    }
  }
});
