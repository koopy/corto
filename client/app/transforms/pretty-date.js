import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize: function(serialized) {
    return moment(serialized).fromNow();
  },

  serialize: function(deserialized) {
    return deserialized;
  }
});
