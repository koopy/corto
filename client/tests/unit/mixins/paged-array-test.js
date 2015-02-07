import Ember from 'ember';
import PagedArrayMixin from 'params/mixins/paged-array';

module('PagedArrayMixin');

// Replace this with your real tests.
test('it works', function() {
  var PagedArrayObject = Ember.Object.extend(PagedArrayMixin);
  var subject = PagedArrayObject.create();
  ok(subject);
});
