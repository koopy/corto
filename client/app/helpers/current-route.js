import Ember from 'ember';
import SuffixLinkView from '../views/suffix-link';

var EmberHandlebars = Ember.Handlebars;
var viewHelper = EmberHandlebars.helpers['view'];
var linkToHelper = EmberHandlebars.helpers['link-to'];

var modelNameCache = {};

function resolveRouteName(store, routeName) {
  var segment = routeName.split('.');
  var types = [];
  for (var i = 0, l = segment.length; i < l; i++) {
    var parsedName = findModelName(segment[i]);
    try {
      store.modelFor(parsedName);
      types.push(parsedName);
    } catch (e) {
      continue;
    }
  }
  Ember.assert('the routeName:' + routeName + ' has been resolved to produce ' + types.length + ' model', types.length === 1);
  return types[0];
}
function findModelName(routeName) {
  return Ember.String.singularize(
    Ember.String.camelize(routeName)
  );
}
function routeResolver(routeName, input) {
  var container, store, modelName;
  Ember.assert('Cannot get the routeName:' + routeName, routeName);
  input.data.view.get('controller.origContext.currentPath');
  if (modelNameCache[routeName]) {
    return modelNameCache[routeName];
  }
  container = input.data.keywords.controller.container;
  store = container.lookup('store:main');
  modelName = resolveRouteName(store, routeName);
  if (!modelNameCache[routeName]) {
    modelNameCache[routeName] = modelName;
  }
  return modelName;
}

var slice = [].slice;

function suffixLinkToHelper() {
  var options = slice.call(arguments, -1)[0];
  var params = slice.call(arguments, 0, -1);
  var hash = options.hash;

  Ember.assert('You must provide one or more parameters to the link-to helper.', params.length);

  //TODO to resolve QuerParams
//  if (params[params.length - 1] instanceof QueryParams) {
//    hash.queryParamsObject = params.pop();
//  }

  hash.disabledBinding = hash.disabledWhen;

  if (!options.fn) {
    var linkTitle = params.shift();
    var linkType = options.types.shift();
    var context = this;
    if (linkType === 'ID') {
      options.linkTextPath = linkTitle;
      options.fn = function () {
        return EmberHandlebars.getEscaped(context, linkTitle, options);
      };
    } else {
      options.fn = function () {
        return linkTitle;
      };
    }
  }

  hash.parameters = {
    context: this,
    options: options,
    params: params
  };

  options.helperName = options.helperName || 'link-to';

  return viewHelper.call(this, SuffixLinkView, options);
}

export default
function () {
  var params = slice.call(arguments, 0, -1);
  var path = params.shift();
  var options = slice.call(arguments, -1)[0];
  var hash = options.hash;
  var suffix = hash.suffix;
  options.types[0] = 'STRING';
  var view = options.data.view;
  var controller = view.get('controller');
  var routeName = controller.get(path);
  var leave = slice.call(arguments, 1);
  routeName = routeResolver(routeName, options);
  var args = [routeName].concat(leave);
  if (suffix) {
    return suffixLinkToHelper.apply(this, args);
  } else {
    return linkToHelper.apply(this, args);
  }
}
