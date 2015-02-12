import Ember from'ember';

var get = Ember.get;
export default
Ember.ArrayController.extend({
  breadcrumbs:Ember.computed('currentPath',function(){
    var crumbs = [];
    // Get all the route objects
    var routes = this.container.lookup('router:main')
      .get('router.currentHandlerInfos');

    // Get the route name, and model if it has one
    routes.forEach(function(route, i, arr) {

      // Ignore index routes etc.
      var name = route.name;
      if (name.indexOf('.index') !== -1 || name === 'application') {
        return;
      }

      var crumb = Ember.Object.create({
        route: route.handler.routeName,
        name: route.handler.routeName,
        model: null
      });

      // If it's dynamic, you need to push in the model so we can pull out an ID in the link-to
      if (route.isDynamic) {
        crumb.setProperties({
          model: route.handler.context,
          name: route.handler.context.get('name')
        });
      }
      crumbs.pushObject(crumb);
    });


    get(crumbs,'lastObject').set('active', true);

    return crumbs;
  }),
  actions: {
    logout: function () {
      this.send('openModal', 'confirm');
    }
  }
});
