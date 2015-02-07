import Ember from 'ember';
import SelectableMixin from 'params/mixins/selectable';

module('SelectableMixin');

// Replace this with your real tests.
test('it works', function() {
  var SelectableObject = Ember.Object.extend(SelectableMixin);
  var subject = SelectableObject.create();
  ok(subject);
});
