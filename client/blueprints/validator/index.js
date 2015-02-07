var fs = require('fs');
var path = require('path');
var inflection = require('inflection');
var stringUtils = require("ember-cli/lib/utilities/string");
var merge = require('merge');
module.exports = {
  description: 'Generates an simple model CRUD.',

  availableOptions: [
    { name: 'model', type: String, default: 'user' }
  ],
  fileMapTokens: function () {
    return {
      __dashvalidatorname__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return options.locals.dashValidatorName;
      }
    };
  },
  locals: function (options) {
    var entity = options.entity;
    var name = entity.name;

    var dashValidatorName = stringUtils.dasherize(name);
    return {
      dashValidatorName: dashValidatorName
    };
  }
};