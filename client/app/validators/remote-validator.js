import Ember from 'ember';
import Base from 'ember-validations/validators/base';

var get = Ember.get;
var set = Ember.set;

export default Base.extend({
  init: function () {
    /*jshint expr:true*/
    this._super();

    if (typeof(this.options) === 'function') {
      this.set('optionsCallBack', this.options);
    } else if (this.options === true) {
      // Do nothing
    } else {
      try {
        throw 'remote validations must be declared as a function';
      }
      catch (error) {
        Ember.Logger.error(error);
      }
    }

    this.set('options', {});
    this.setOptions();

    // Make model invalid by default
    // Not the best - should have a default error message that is added to the
    // errors hash before server validations have run. Eg: 'has not been validated'
    this.errors.pushObject(this.options.message);
  },

  _validate: function () {
    if (this.canValidate()) {
      var self =this;
      return new Ember.RSVP.Promise(function(resolve,reject){
        self.validateRemotely(resolve,reject);
      });
    }
  },
  canValidate:function(){
    var flag = this._super();
    var model = this.model;
    var canRemote = model.get('isNew') || model.get('isDirty');
    var options = this.get('options');
    var validateOnNew = canRemote && options.validateOnNew;
    return canRemote && validateOnNew;
  },

  // Sets the options to send with the ajax request and wraps the call() funciton in a debounce
  validateRemotely: function (resolve,reject) {
    this.setOptions();

    if (this.options.url !== undefined) {
      this.call(resolve,reject);
    }
  },

  setOptions: function () {
    this.setDefaultOptions();

    // Run the optionsCallBack and merge it with the options hash if the validation was
    // declared as a function.
    if (this.get('optionsCallBack')) {
      // Maybe add a guard in here to check that the value returned by the optionsCallBack is a hash before trying to merge it.
      var updatedOptions = Ember.$.extend({}, this.get('options'), this.optionsCallBack());
      if (!updatedOptions.url) {
        this.setDefaultUrl(updatedOptions);
      }
      this.set('options', updatedOptions);
    }

    this.verifyRequiredOptions();
  },
  setDefaultUrl: function (options) {
    var model = this.get('model');
    var store = model.get('store');
    if (store) {
      var type = store.modelFor(model.constructor);
      var adapter = store.adapterFor(type);
      var url = adapter.buildURL(type.typeKey);
      options.url = [url,this.property,options.endpoint || "uniqueness"].join("/");
    }
  },

  setDefaultOptions: function () {
    if (this.options.data === undefined) {
      this.set('options.data', {});
    }

    if (this.options.message === undefined) {
      this.set('options.message', Ember.Validations.messages.render('defaultRemoteValidation', this.options));
    }

    if (this.options.errorOnStatus === undefined) {
      this.set('options.errorOnStatus', Ember.makeArray([404, 422, 500]));
    }
  },

  verifyRequiredOptions: function () {
    var self = this,
      requiredOptions = Ember.makeArray(['url', 'message', 'errorOnStatus']);

    requiredOptions.forEach(function (option) {
      // Throw error if option in requiredOptions array is undefined.
      if (self.get('options.' + option) === undefined) {
        try {
          throw 'must specify ' + option + ' option for remote validation';
        }
        catch (error) {
          Ember.Logger.error(error);
        }
      }
    });
  }
});
