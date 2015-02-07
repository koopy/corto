import Ember from 'ember';
import AutoRouteMixinMixin from 'params/mixins/auto-route-mixin';

module('AutoRouteMixinMixin');

// Replace this with your real tests.
test('it works', function() {
  var AutoRouteMixinObject = Ember.Object.extend(AutoRouteMixinMixin);
  var subject = AutoRouteMixinObject.create();
  ok(subject);
});
