/**
 * Created by weiyang on 15-2-6.
 */
import Ember from 'ember';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';

export default PagedRemoteArray.extend({
  rawFindFromStore: function() {
    var store = this.get('store');
    var modelName = this.get('modelName');

    var ops = this.get('paramsForBackend');
    var res = store.findExclude(modelName, ops);

    return res;
  }
});