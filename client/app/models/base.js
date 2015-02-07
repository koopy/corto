import Ember from 'ember';
import DS from 'ember-data';
import EmberValidations from 'ember-validations';

EmberValidations.Mixin.reopen({
  _validate: function() {
    var promises = this.validators.invoke('_validate').without(undefined);
    return Ember.RSVP.all(promises);
  }
});
var get = Ember.get;
export default DS.Model.extend(EmberValidations.Mixin,{
  findHasMany: function (relationName, query) {
    var relationship = get(this.constructor, 'relationshipsByName').get(relationName);
    var store = this.store;
    if (!Ember.isEmpty(relationship) ) {
      return store.findAsyncHasMany(this, relationship, query).then(function (records) {
//        store.updateRecordsFromAdapter(records);
//        return store.manyArray;
        //TODO update relation
        return records;
      });
    }
  }
});