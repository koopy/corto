import Ember from 'ember';

var DataValueObserver = Ember.Object.extend({
  init: function () {
    this._super();
    // one way binding (for now)
    Ember.addObserver(this.parent, this.key, this, 'valueChanged');
  },
  value: function () {
    return Ember.get(this.parent, this.key);
  }.property(),
  valueChanged: function () {
    this.notifyPropertyChange('value');
  }
});

//
function everyEachHelper() {
  var args = [].slice.call(arguments);
  var options = args.pop();
  var context = (options.contexts && options.contexts[0]) || this;

  Ember.assert("Must be in the form #every foo in bar ", 3 === args.length && args[1] === "in");
  options.hash.keyword = args[0];
  var property = args[2];

  // if we're dealing with an array we can just forward onto the collection helper directly
  var p = this.get(property);
  if (Ember.Array.detect(p)) {
    options.hash.dataSource = p;
    return Ember.Handlebars.helpers.collection.call(this, Ember.Handlebars.EachView, options);
  }

  // create an array that we will manage with content
  var array = Ember.ArrayController.create();
  options.hash.dataSource = array;
  Ember.Handlebars.helpers.collection.call(this, Ember.Handlebars.EachView, options);

  //
  var update_array = function (result) {
    if (!result) {
      array.clear();
      return;
    }

    // check for proxy object
    result = (result.isProxy && result.content) ? result.content : result;
    var items = result;

    var keys = Ember.keys(items).sort();

    // iterate through sorted array, inserting & removing any mismatches
    var i = 0;
    for (; i < keys.length; ++i) {
      var key = keys[i];
      var value = items[key];
      while (true) {
        var old_obj = array.objectAt(i);
        if (old_obj) {
          Ember.assert("Assume that all objects in our array have a key", undefined !== old_obj.key);
          var c = key.localeCompare(old_obj.key);
          if (0 === c) break; //jshint ignore:line
          if (c < 0) {
            array.removeAt(i); // remove as no longer exists
            continue;
          }
        }

        // insert
        if (typeof value === 'object') {
          // wrap object so we can give it a key
          value = Ember.ObjectProxy.create({
            content: value,
            isProxy: true,
            key: key
          });
          array.insertAt(i, value);
        } else {
          // wrap raw value so we can give it a key and observe when it changes
          value = DataValueObserver.create({
            parent: result,
            key: key,
          });
          array.insertAt(i, value);
        }
        break;
      }
    }
    // remove any trailing items
    while (array.objectAt(i)) array.removeAt(i); //jshint ignore:line
  };

  var should_display = function () {
    return true;
  };

  // use bind helper to call update_array if the contents of property changes
  var child_properties = ["[]"];
  var preserve_context = true;
  if (options.hash["path"]) {
    property = options.hash["path"];
    var paths = property.split(".");
    if (paths.length > 1) {
      property = paths.pop();
      var shiftItem;
      while ((shiftItem = paths.shift()) != null) {
        context = p.get(shiftItem);
      }
    } else {
      context = p;
    }
  }
  return Ember.Handlebars.bind.call(context, property, options, preserve_context, should_display, update_array, child_properties);
}

export default
function () {
  return everyEachHelper.apply(this, arguments);
}
