import Ember from 'ember';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

export function initialize(container, application) {
  reopenRoute(container,application);
  reopenPagedRemoteArray(container,application);

}
function reopenRoute(container,application){
  Ember.Route.reopen({
    titleToken:function(){
      if(Ember.FEATURES.isEnabled('ember-document-title')){
        return container.lookup('controller:application').get('currentPath');
      }
    }
  });
}

function reopenPagedRemoteArray(container,application){
  var mergePagination = true;

  var filter = {
    where: {
    }
  };

  PagedRemoteArray.reopen({
    paramsForBackend: function () {
      var ops = this._super();
      ops.offset = ops.limit * (ops.page - 1);
      //过滤掉列表中已删除的数据
      //TODO
      ops.filter = Ember.$.extend(true, {},filter, ops.filter , this.get('args'));
      if(mergePagination){
        ops.filter.limit = ops.limit;
        ops.filter.offset = ops.offset;
        delete ops.limit;
        delete ops.offset;
      }
      return ops;
    }.property('page', 'perPage', 'paramMapping', 'paramsForBackendCounter', 'args'),
    pageChanged: function() {
      this.set("promise", this.fetchContent());
    }.observes("page", "perPage","args")
  });
}

export default {
  name: 'reopen',
  initialize: initialize
};
