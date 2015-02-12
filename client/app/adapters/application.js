import Ember from 'ember';
import DS from 'ember-data';

var get = Ember.get;
var a_slice = [].slice,
  rquery = (/\?/);
export default
DS.RESTAdapter.extend({
  namespace:'api',
  findAsyncHasMany: function (store, owner, relationship, query) {
    var id = get(owner, 'id');
    var type = owner.constructor.typeKey;
    var url = this.buildURL(type, id, owner);
    var child = relationship.type.typeKey;
    url += '/' + this.pathForType(child);
    return this.ajax(url, 'GET', { data: query});
  },
  findExclude: function (store, type, filter) {
    return this.ajax(this.appendURL(type.typeKey, "exclude"), "GET", {data: filter});
  },
  appendURL: function () {
    var urlArgs = a_slice.call(arguments, 0, -1);
    var suffix = a_slice.call(arguments, -1)[0];
    return this.buildURL.apply(this, urlArgs) + "/" + suffix;
  },
  buildURL: function (type, id, record) {
    this.set('serializerType', getSerializerTypeHeader(this, type));
    return this._super.apply(this, arguments);
  },
  headers: function () {
    var ret = {};
    return {
      serializerType: this.get('serializerType'),
      pagination: true
    };
  }.property('serializerType')
});


function getSerializerTypeHeader(adapter, type) {
  var serializer = serializerForAdapter(adapter, type);

  var serializers = [DS.JSONSerializer, DS.RESTSerializer, DS.ActiveModelSerializer];

  //TODO:考虑serializer原型为Object的情形
  var header = 'rest';
  for (var i = serializers.length - 1; i >= 0; i--) {
    if (serializer instanceof serializers[i]) {
      var pattern = /DS.(\w+)Serializer/;
      var name = pattern.exec(serializers[i].toString()).pop();
      header = name.toLowerCase();
      break;
    }
  }

  return header;
}
function serializerFor(container, type, defaultSerializer) {
  return container.lookup('serializer:' + type) ||
    container.lookup('serializer:application') ||
    container.lookup('serializer:' + defaultSerializer) ||
    container.lookup('serializer:-default');
}

function serializerForAdapter(adapter, type) {
  var serializer = adapter.serializer,
    defaultSerializer = adapter.defaultSerializer,
    container = adapter.container;

  if (container && serializer === undefined) {
    serializer = serializerFor(container, type.typeKey, defaultSerializer);
  }

  if (serializer === null || serializer === undefined) {
    serializer = {
      extract: function (store, type, payload) {
        return payload;
      }
    };
  }

  return serializer;
}
