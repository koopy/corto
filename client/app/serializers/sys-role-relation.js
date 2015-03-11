import DS from 'ember-data';
import RelationSerializer from './relation';

export default
DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    sysGroup: {embedded: "always", key: 'sysGroup'},
    sysPosition: {embedded: "always", key: 'sysPosition'},
    sysUser: {embedded: "always", key: 'sysUser'},
    sysDept: {embedded: "always", key: 'sysDept'},
    sysOrg: {embedded: "always", key: 'sysOrg'},
    sysRole: {embedded: "always", key: 'sysRole'}
  },
  serializeHasMany: Ember.K,
  serializeIntoHash: function (hash, type, record, options) {
    Ember.merge(hash, this.serialize(record, options));
  }
});
