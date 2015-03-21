import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

PagedRemoteArray.reopen({
  pageChanged: function() {
    this.set("promise", this.fetchContent());
  }.observes("page", "perPage","args")
});

export default
Ember.Mixin.create(RouteMixin, {

  model: function (params) {
    params.paramMapping = {
      perPage: 'limit',
      total_pages: 'totalPage'
    };
    params.offset = params.perPage * (params.page - 1);
    return this.findPaged(this.resolveRouteName(), params);
  },
  resolveRouteName: function () {
    var routeName = this.get('routeName');
    var segment = routeName.split('.');
    var store = this.store;
    var types = [];
    for (var i = 0, l = segment.length; i < l; i++) {
      var parsedName = this._findModelName(segment[i]);
      try {
        var t = store.modelFor(parsedName);
        if (types.indexOf(t) == -1) {
          types.push(t);
        }
      } catch (e) {
        continue;
      }
    }
    Ember.assert('the routeName:' + routeName + ' has been resolved to produce ' + types.length + ' model', types.length === 1);
    return types[0];
  }
});
