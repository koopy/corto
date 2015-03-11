import Ember from 'ember';

export default
Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    var routeName = this.routeName;
    var elements=['department', 'group', 'org', 'position', 'user'];
    var modules = elements.map(function (item) {
      return routeName + '.' + item;
    });
    var container = this.container;
    var currentModel = this.get('currentModel');
    modules.map(function(item){
      var con = container.lookup('controller:' + item);
      if (con) {
        Ember.sendEvent(con,'enter',[currentModel]);
      }
    });
    var self = this;
    modules.forEach(function (item, idx) {
      self.render(item, {
        into: routeName,
        outlet: elements[idx]
      });
    });
  }
});
