import Ember from 'ember';
import RoleMatrix from 'app/metadatas/role-matrix';

var mapping = RoleMatrix.map;
var collection = RoleMatrix.collection;

var set = Ember.set;

//TODO how to add or replace replace
export default
Ember.Route.extend({
  setupController: function (controller, context, transition) {
    if (controller && (context !== undefined)) {
      var roles = this.extractRole(context);
      this.sort(roles);
      set(controller, 'model', roles);
      set(controller,'header',collection);
    }
  },
  sort: function (roles) {
    roles.forEach(function (role) {
      var relationTypes = role.get('relationTypes');
      var cache = new Array(collection.length);
      var cacheMap = {};
      relationTypes.forEach(function (relation) {
        var principalType = relation.get('principalType');
        cacheMap[principalType] = relation;
      });
      for (var type in mapping) {
        var cur = mapping[type];
        var idx = cur.index;
        var editable = cur.editable;
        var item = cacheMap[type];
        if (editable && item) {
          item.set('editable', editable);
        }
        cache.splice(idx, 1, item);
      }
      relationTypes.clear();
      role.set('relationTypes', cache);
    });
  },
  /**
   * Master class : SysRole
   * Slave class : SysUser SysOrg SysGroup SysPosition
   * @param relations
   * @returns {Array}
   */
  extractRole: function (relations) {
    var roles = [];
    relations.forEach(function (relation) {
      if(Ember.isEmpty(relation)){
        return;
      }
      var role = relation.get('sysRole');
      var principalType = relation.get('principalType');
      if (!roles.contains(role)) {
        roles.pushObject(role);
      }
      if (!role.get('relationTypes')) {
        role.set('relationTypes', Ember.A());
      }
      /**
       * one role can't be apply for the same slave class:user group position ...
       * TODO check duplicate ?
       */
      var types = role.get('relationTypes');
      if (!types.contains(relation)) {
        types.pushObject(relation);
      }
    });
    return roles;
  },
  model: function () {
    var SysRoleRelation = this.store.modelFor('sys-role-relation');
    var controller = this.container.lookup('controller:' + this.routeName);
      var currentModel = this.get('currentModel');
      return SysRoleRelation.findRolesByUser(this.store, currentModel.get('id'));
  }
});
