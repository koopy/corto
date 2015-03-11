/**
 * Created by jiangwy on 15-3-10.
 */
var get = Ember.get;
var Promise = Ember.RSVP.Promise;
var PromiseArray = DS.PromiseArray;
var promiseArray = function(promise, label) {
  return PromiseArray.create({
    promise: Promise.resolve(promise, label)
  });
};


function serializerFor(container, type, defaultSerializer){
  return container.lookup('serializer:'+type) ||
    container.lookup('serializer:application') ||
    container.lookup('serializer:' + defaultSerializer) ||
    container.lookup('serializer:-default');
}
function serializerForAdapter(adapter,type){
  var serializer = adapter.serializer;
  var defaultSerializer = adapter.defaultSerializer;
  var container = adapter.container;

  if (container && serializer === undefined) {
    serializer = serializerFor(container, type.typeKey, defaultSerializer);
  }

  if (serializer === null || serializer === undefined) {
    serializer = {
      extract: function(store, type, payload) { return payload; }
    };
  }

  return serializer;
}

//function adapterRun(store, fn) {
//  return Ember.run(fn);
//}
function _guard(promise, test) {
  var guarded = promise['finally'](function() {
    if (!test()) {
      guarded._subscribers.length = 0;
    }
  });

  return guarded;
}

function _bind(fn) {
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return fn.apply(undefined, args);
  };
}
function _objectIsAlive(object) {
  return !(get(object, 'isDestroyed') || get(object, 'isDestroying'));
}

export {
  Promise,
  promiseArray,
    serializerFor,
    serializerForAdapter,
    _guard,
    _bind,
    _objectIsAlive
}
