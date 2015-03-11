import Ember from 'ember';
import DS from 'ember-data';
import {
  Promise,
  promiseArray,
  serializerFor,
  serializerForAdapter,
  _guard,
  _bind,
  _objectIsAlive
  } from './utils/serialize-meta';


export default DS.Store.extend({
  findExclude: function (typeName, query) {
    Ember.assert("You need to pass a type to the store's findExclude method", arguments.length >= 1);
    Ember.assert("You need to pass a query with type && id to the store's findExclude method", arguments.length === 2 );


    var type = this.modelFor(typeName);
    var adapter = this.adapterFor(type);
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
