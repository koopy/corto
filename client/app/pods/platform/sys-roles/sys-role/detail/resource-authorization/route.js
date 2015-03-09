import Ember from 'ember';

export default
Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    var routeName = this.routeName;
    var modules = [routeName+'.position',routeName+'.group'];
    var container = this.container;
    var currentModel = this.get('currentModel');
    modules.map(function(item){
      var con = container.lookup('controller:' + item);
      if (con) {
        Ember.sendEvent(con,'enter',[currentModel]);
      }
    });

    this.render(routeName + '.position', {
      into: routeName,
      outlet: 'position'
    });
    this.render(routeName + '.group', {
      into: routeName,
      outlet: 'group'
    });
  }
});
