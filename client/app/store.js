import Ember from 'ember';
import DS from 'ember-data';

var get = Ember.get;
var PromiseArray = DS.PromiseArray;
var promiseArray = function(promise, label) {
  return PromiseArray.create({
    promise: Promise.resolve(promise, label)
  });
};
export default DS.Store.extend({
  findExclude: function (typeName, query) {
    Ember.assert("You need to pass a type to the store's findExclude method", arguments.length >= 1);
    Ember.assert("You need to pass a query with type && id to the store's findExclude method", arguments.length === 2 );

    var adapter = this.adapterFor(typeName);
    var type = this.modelFor(typeName);
    var array = this.recordArrayManager
      .createAdapterPopulatedRecordArray(type, query);
    return promiseArray(_findExclude(adapter, this, type,query,array));
  },
  findAsyncHasMany: function (owner, relationship, query,array) {
    var adapter = this.adapterFor(owner.constructor);
    var array = this.recordArrayManager
      .createAdapterPopulatedRecordArray(relationship.type, query);
    Ember.assert('You tried to load a hasMany relationship but you have no adapter (for ' + owner.constructor + ')', adapter);
    Ember.assert('You tried to load a hasMany relationship through owner record with child record' +
      ' but your adapter does not implement `findAsyncHasMany`', typeof adapter.findAsyncHasMany === 'function');

    return promiseArray(findAsyncHasMany(adapter, this, owner, relationship, query,array));
  }
});
function _findExclude(adapter, store, type, query,recordArray) {
  var promise = adapter.findExclude(store, type, query, recordArray);
  var serializer = serializerForAdapter(adapter, type);
  var label = "DS: Handle Adapter#findExclude of " + type;

  promise = Promise.cast(promise, label);
  promise = _guard(promise, _bind(_objectIsAlive, store));

  return promise.then(function(adapterPayload) {
    var payload = serializer.extract(store, type, adapterPayload, null, 'findQuery');

    Ember.assert("The response from a findQuery must be an Array, not " + Ember.inspect(payload), Ember.typeOf(payload) === 'array');

    recordArray.load(payload);
    return recordArray;
  }, null, "DS:Extract payload of '" + type + "'");
}


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
var Promise = Ember.RSVP.Promise;
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
function findAsyncHasMany(adapter, store, record, relationship, query,recordArray) {
  var promise = adapter.findAsyncHasMany(store, record, relationship, query,recordArray);
  var serializer = serializerForAdapter(adapter, relationship.type);
  var label = 'DS: Handle Adapter#findAsyncHasMany of ' + record + ' : ' + relationship.type;

  promise = Promise.cast(promise, label);
  promise = _guard(promise, _bind(_objectIsAlive, store));
  promise = _guard(promise, _bind(_objectIsAlive, record));

  return promise.then(function(adapterPayload){
    var payload = serializer.extract(store, relationship.type, adapterPayload, null, 'findQuery');

    Ember.assert('The response from a findAsyncHasMany must be an Array, not ' + Ember.inspect(payload), Ember.typeOf(payload) === 'array');

//    var records = store.pushMany(relationship.type, payload);
    recordArray.load(payload);
    return recordArray;
  }, null, 'DS: Extract payload of ' +  relationship.type + ' : asyncHasMany under the owner'+record);
}