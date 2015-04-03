import Ember from 'ember';
import AdvancedQuery from 'app/utils/advanced-query';

var get = Ember.get;

function createMixin(model) {
  var field = model.config.identity.field;
  return Ember.Mixin.create({
    init: function () {
      this._super();
      this.set('selection', Ember.A());

      var filter = {
        where: {
          status:true
        }
      };
      filter.where[field] = {
        like: true
      };
      this.set('advancedQuery', AdvancedQuery.create({
        filters: filter,
        modelConstructor: model,
        owner: this
      }));
    },
    statusDidChange:function(){
      this.flushQuery();
    }.observes('status'),
    statusContent: [
      {name: '全部', key: 1},
      {name: '启用', key: 2},
      {name: '禁用', key: 3}
    ],
    removeUndefined: function (array) {
      if (Ember.isArray(array)) {
        for (var i = 0, l = array.length; i < l; i++) {
          if (!array[i]) {
            array.splice(i, 1);
            i--;
          }
        }
      }
      return array;
    },
    queryParams: ['page', 'perPage'],

    // set default values, can cause problems if left out
    // if value matches default, it won't display in the URL
    page: 1,
    perPage: 10,
    pageBinding: 'content.page',
    perPageBinding: 'content.perPage',
    totalPagesBinding: 'content.totalPages',

    pageChanged:function(){
      this.get('selection').clear();
    }.observes('page'),
    columns: function () {
      return model.columnDefinitions;
    }.property(),
    flushQuery:function(){
      Ember.run.schedule('sync', this, function() {
        this.set('content.args',this.get('advancedQuery.queryParams'));
      });
    },
    actions: {
      delBatch: function (popupName) {
        var selection = this.get('selection');
        if (selection.length > 0) {
          selection = selection.map(function(item){
            if(item){
              return item.get('content');
            }
          });
          selection = this.removeUndefined(selection);
          if (selection.length > 0) {
            return this.send('openPopup', popupName, selection);
          }
        }
      },
      search: function (name) {
        this.set('name',name);
        this.flushQuery();
      }
    }
  });
}

export default
function (model) {
  Ember.assert('PagedArray Mixin must provide the corresponding model', model);

  return createMixin(model);
}
