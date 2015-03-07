/**
 * Created by weiyang on 15-1-19.
 */
import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
import ExcludePagedArray from 'app/mixins/exclude-paged-array';
import Util from 'ember-cli-pagination/util';

export default
Ember.Controller.extend(Ember.PromiseProxyMixin,{
  init: function () {
    this._super();
    this.set('selection', Ember.A());
  },
  loadBefore: function () {
    var selection = this.get('selection');
    selection.clear();
  },
  loadData: function (modelType) {
    var setted = this.get('modelType');
    if (!setted) {
      Ember.assert('The list dialog need modelType to request', modelType);
      this.set('modelType', modelType);
    } else if (setted && modelType && setted != modelType) {
      this.set('modelType', modelType);
    }

    modelType = modelType || setted;

    this.loadBefore();
    var params = {
      filter: {
        type: 'sysUser',
        id: 1
      }
    };
    var mainOps = {
      page: params.page || this.get('startingPage'),
      perPage: params.perPage || this.get('perPage'),
      modelName: modelType.typeKey,
      store: this.store
    };

    if (params.paramMapping) {
      mainOps.paramMapping = params.paramMapping;
    }

    var otherOps = Util.paramsOtherThan(params, ["page", "perPage", "paramMapping"]);
    mainOps.otherParams = otherOps;

    mainOps.initCallback = Ember.K;

    this.set('content', ExcludePagedArray.create(mainOps));
  }.on('open'),
  columns: function () {
    var model = this.get('modelType');
    return model.subsetDefinitions;
  }.property('modelType'),

  triggerSource: null,
  startingPage: 1,
  page: 1,
  perPage: 10,
  limit: Ember.computed.alias('perPage'),
  pageBinding: 'content.page',
  perPageBinding: 'content.perPage',
  totalPagesBinding: 'content.totalPages',
  actions: {
    ensure: function () {
      var triggerSource = this.get('triggerSource');
      var selection = this.get('selection');
      if (triggerSource && selection.length > 0) {
        //TODO low to high can get the sender
        //TODO but from high to low can't get the sender
        triggerSource.send('ensure', selection, this);
      }
    },
    refresh: function () {
      this.loadData();
    }
  }
});
