import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';
import resolveWildcard from 'corto/utils/resolve-wildcard';

var locales = resolveWildcard('app/locales/*');
//Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver: Resolver,
  localeNames: Ember.computed(function () {
    return locales.names.map(function (item) {
      var segments = item.split('/');
      return segments[segments.length - 1];
    });
  })
});

loadInitializers(App, config.modulePrefix);

moment.locale('zh-cn');

//Ember.EasyForm.Config.registerWrapper('bootstrap', {
//  // Define the custom template
//  inputTemplate: 'bootstrap-input',
//
//  // Define a custom config used by the template
//  controlsWrapperClass: 'col-sm-8',
//
//  // Define the classes for the form, label, error...
//  formClass: 'form-horizontal',
//  fieldErrorClass: 'has-error',
//  errorClass: 'has-error',
//  hintClass: 'help-block',
//  labelClass: 'col-sm-4 control-label no-padding-right',
//  inputClass: 'form-group'
//});
export default App;
