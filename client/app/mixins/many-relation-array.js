import Ember from 'ember';
import ColumnDefinition from 'ember-cli-ember-table/column-definition';
import PagedRemoteArray from 'ember-cli-pagination/remote/paged-remote-array';
import Util from 'ember-cli-pagination/util';

var a_slice = [].slice,
  get = Ember.get,
  Promise = Ember.RSVP.Promise;

export
function createMixin(model,relationModel) {
  var columns = model.columns;
  var identity = model.config.identity;
  var modelName = model.typeKey;
  Ember.assert('The model :' + model + ' must config the identity with field and name', identity && identity.field && identity.name);

  return Ember.Mixin.create(Ember.PromiseProxyMixin,{
    modelType: model,
    startingPage: 1,
    currentModel: null,
    loadData: function (currentModel) {
      if (currentModel) {
        this.set('currentModel', currentModel);
      }
        //TODO
        var params = {
            include: modelName,
            objectId: currentModel.get('id'),
            limit:1,
            offset:0,
            filter: {
                where: {

                }
            }
        };
      var mainOps = {
        page: params.page || this.get('startingPage'),
        perPage: params.perPage || this.get('perPage'),
        modelName: relationModel.typeKey,
        store: this.store
      };

      if (params.paramMapping) {
        mainOps.paramMapping = params.paramMapping;
      }

      var otherOps = Util.paramsOtherThan(params, ["page", "perPage", "paramMapping"]);
      mainOps.otherParams = otherOps;

      mainOps.initCallback = Ember.K;

      this.set('content', PagedRemoteArray.create(mainOps));
    }.on('enter'),
    columns: function () {
      var copyed = Ember.copy(columns, true);
      var subset = model.subset.map(function (f) {
        var col = get(copyed, f);
        Ember.assert('Can not get the column with field :', f);
        if (f == identity.field) {
          col.contentPath = modelName + '.' + f;
        }
        return col;
      });
      return subset.map(function(item){
        return ColumnDefinition.create(item);
      });
    }.property(),
    page: 1,
    perPage: 10,
    limit: Ember.computed.alias('perPage'),
    pageBinding: 'content.page',
    perPageBinding: 'content.perPage',
    totalPagesBinding: 'content.totalPages',

    actions: {
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

function ManyRelationArray(model,relationModel) {
  Ember.assert('ManyRelationArray Mixin must provide the corresponding model', model);
  Ember.assert('ManyRelationArray Mixin must provide the relationModel', relationModel);

  return createMixin(model,relationModel);
}

export {
  ManyRelationArray
}
