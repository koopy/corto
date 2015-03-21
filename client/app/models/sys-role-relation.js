import DS from 'ember-data';
import Relation from './relation';

import {
  Promise,
  promiseArray,
  serializerFor,
  serializerForAdapter,
  _guard,
  _bind,
  _objectIsAlive
  } from '../utils/serialize-meta';

var attr = DS.attr,
  belongsTo = DS.belongsTo,
  hasMany = DS.hasMany;
var Model = Relation.extend({
  principalType: attr(),
  principalId: attr(),
  objectId: attr(),
  created: attr('date'),

  //master
  sysRole: belongsTo('sysRole'),
  sysUser: belongsTo('sysUser'),
  sysGroup: belongsTo('sysGroup'),
  //slave
  sysPosition: belongsTo('sysPosition')
});


Model.reopenClass({
    findRolesByUser:function(store,userId){
    Ember.assert("You need to pass a type to the SysRole's _findRolesByUser method", arguments.length >= 1);
    Ember.assert("You need to pass a userId to the SysRole's _findRolesByUser method", arguments.length === 2 );

    var type = store.modelFor(this.typeKey);
    var adapter = store.adapterFor(type);
    var query ={
      userId:userId
    }
    var array = store.recordArrayManager.createAdapterPopulatedRecordArray(type, query);
    return promiseArray(_findRolesByUser(adapter, store, type,query,array));
  }
});

function _findRolesByUser(adapter, store, type, query,recordArray) {
  var promise = adapter.findRolesByUser(store, type, query, recordArray);
  var serializer = serializerForAdapter(adapter, type);
  var label = "DS: Handle Adapter#findRolesByUser of " + type;

  promise = Promise.cast(promise, label);
  promise = _guard(promise, _bind(_objectIsAlive, store));

  return promise.then(function(adapterPayload) {
    var payload = serializer.extract(store, type, adapterPayload, null, 'findQuery');

    Ember.assert("The response from a findQuery must be an Array, not " + Ember.inspect(payload), Ember.typeOf(payload) === 'array');

    recordArray.load(payload);
    return recordArray;
  }, null, "DS:Extract payload of '" + type + "'");
}


export default Model;
