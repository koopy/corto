/**
 * Created by jiangwy on 15-3-6.
 */
import Ember from 'ember';

var moment = window.moment;

export default
function applyTransforms(type, data) {
  var transform = transformFor(type);
  return transform.deserialize(data);
  ;
}

var transformCache = {};
function transformFor(type, skipAssertion) {
  var transform = transformCache[type];
  Ember.assert("Unable to find transform for '" + type + "'", skipAssertion || !!transform);
  return transform;
}
function notImplement() {
  throw new Error('This method must to be implemented !');
}
var BaseTransform = {
  serialize: notImplement,
  deserialize: notImplement
};

var PrettyDateTransform = Ember.merge({}, {
  deserialize: function (serialized) {
    return moment(serialized).fromNow();
  }
});
var StringTransform = Ember.merge({}, {
  deserialize: function (serialized) {
    return Ember.isNone(serialized) ? null : String(serialized);
  },
  serialize: function (deserialized) {
    return Ember.isNone(deserialized) ? null : String(deserialized);
  }
});

transformCache['date'] = PrettyDateTransform;
transformCache['string'] = StringTransform;
