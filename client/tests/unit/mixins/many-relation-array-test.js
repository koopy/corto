import Ember from 'ember';
import ManyRelationArrayMixin from 'corto/mixins/many-relation-array';

module('ManyRelationArrayMixin');

// Replace this with your real tests.
test('it works', function() {
  var ManyRelationArrayObject = Ember.Object.extend(ManyRelationArrayMixin);
  var subject = ManyRelationArrayObject.create();
  ok(subject);
});
