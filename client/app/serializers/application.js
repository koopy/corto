import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  serializeHasMany: Ember.K,
  serializeIntoHash: function(hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  }
});
