import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import Util from 'ember-cli-pagination/util';
import AdvancedQuery from 'app/utils/advanced-query';

var a_slice = [].slice,
  get = Ember.get,
  Promise = Ember.RSVP.Promise;

//TODO do render after promise fulfill
export
function createMixin(model, relationModel) {
  var columns = model.columns;
  var identity = model.config.identity;
  var field = identity.field;
  var modelName = model.typeKey;
  Ember.assert('The model :' + model + ' must config the identity with field and name', identity && identity.field && identity.name);

  return Ember.Mixin.create(Ember.PromiseProxyMixin, {
    modelType: model,
    currentModel: null,
    paramsForBackend:function(){
      var params = {
        filter: {
          include: [modelName],
          where: {
            principalType: modelName,
            objectId: this.get('currentModel.id')
          }
        }
      };
      params.paramMapping={
        perPage: 'limit',
        total_pages: 'totalPage'
      };
      return params;
    }.property(),
    init: function () {
      this._super();
      this.set('advancedQuery', AdvancedQuery.create({
        filters: {
          where:{
            name: {
              like: true
            }
          }
        },
        modelConstructor: model,
        owner: this
      }));
    },
    loadData: function (currentModel) {
      if (currentModel) {
        this.set('currentModel', currentModel);
      }
      this.set('args', this.get('paramsForBackend'));
      this.set('content', this.findPaged(relationModel.typeKey, this.get('args')));
    }.on('enter'),
    findPaged: function (name, params, callback) {
      var mainOps = {
        page: params.page || 1,
        perPage: params.perPage || 1,
        modelName: name,
        store: this.store
      };

      if (params.paramMapping) {
        mainOps.paramMapping = params.paramMapping;
      }

      var otherOps = Util.paramsOtherThan(params, ["page", "perPage", "paramMapping"]);
      mainOps.otherParams = otherOps;

      mainOps.initCallback = callback;

      return PagedRemoteArray.create(mainOps);
    },
    columns: function () {
      var clone = Ember.copy(columns, true);
      var subset = model.subset.map(function (f) {
        var col = get(clone, f);
        Ember.assert('Can not get the column with field :', f);
        if (f == identity.field) {
          col.contentPath = modelName + '.' + f;
        }
        return col;
      });
      return subset.map(function (item) {
        return ColumnDefinition.create(item);
      });
    }.property(),
    queryParams: ['page', 'perPage'],
    page: 1,
    perPage: 10,
    pageBinding: 'content.page',
    perPageBinding: 'content.perPage',
    totalPagesBinding: 'content.totalPages',
    flushQuery:function(){
      Ember.run.schedule('sync', this, function() {
        var queryParams = this.get('advancedQuery.queryParams');
        this.set('content.args',queryParams);
      });
    },
    actions: {
      search: function (name) {
        this.set('name',name);
        this.flushQuery();
      },
      ensure: function (selection) {
        //TODO check if the relation has exists
        var sender = a_slice.call(arguments, -1)[0];

        if (Ember.isArray(selection) && selection.length > 0) {
          var currentModel = this.get('currentModel');
          var store = this.store;

          var promises = selection.map(function (item) {
            var related = item.get('content');
            var userRelation = store.createRecord(relationModel.typeKey, {
              principalType: related.constructor.typeKey,
              principalId: related.get('id'),
              objectId: currentModel.get('id')
            });
            return userRelation.save();
          });
          //TODO should use bulkCreate ?
          Promise.all(promises).then(function () {
            this.loadData();
            sender.send('refresh');
          }.bind(this));
        }
      }
    }
  });
}

function ManyRelationArray(model, relationModel) {
  Ember.assert('ManyRelationArray Mixin must provide the corresponding model', model);
  Ember.assert('ManyRelationArray Mixin must provide the relationModel', relationModel);

  return createMixin(model, relationModel);
}

export
{
  ManyRelationArray
}
