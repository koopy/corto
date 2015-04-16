import Ember from 'ember';
import SenderActionMixin from 'corto/mixins/sender-action';

module('SenderActionMixin');

// Replace this with your real tests.
test('it works', function() {
  var SenderActionObject = Ember.Object.extend(SenderActionMixin);
  var subject = SenderActionObject.create();
  ok(subject);
});
