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
      __dashmodelname__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return options.locals.dashModelName;
      },
      __pluraldashmodelname__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return inflection.pluralize(options.locals.dashModelName);
      },
      __dashmodelnameprofile__: function (options) {
        if (options.pod) {
          return path.join(options.podPath, options.dasherizedModuleName);
        }
        return options.locals.dashModelName + "-profile";
      }
    };
  },
  locals: function (options) {
    var entity = options.entity;
    var entityName = entity.name;

    var pluralmodelname = inflection.pluralize(entityName);
    var upperModelName = inflection.camelize(entityName);
    var dashModelName = stringUtils.dasherize(entityName);

    var columns = renderFormTemplate(entityName);
    var modelFormOptions = columns.modelFormOptions;
    var configOptions = columns.configOptions;
    return {
      pluralmodelname: pluralmodelname,
      upperModelName: upperModelName,
      dashModelName: dashModelName,
      modelName: entityName,
      modelFormOptions: modelFormOptions,
      configOptions: configOptions,
      fieldInterval: 5
    };
  }
};
function renderFormTemplate(model) {
  var dashed, modelPath, content, white, columnsReg, columnsDef;
  dashed = stringUtils.dasherize(model);
  modelPath = path.join(process.cwd(), 'app', 'models', dashed + '.js');
  content = fs.readFileSync(modelPath, 'utf-8');
  white = /\s/gmi;
  content = content.replace(white, "");
  columnsReg = /(columns=.*})/;
  columnsDef = content.match(columnsReg);
  var modelFormOptions = [];
  var configOptions;
  if (columnsDef != null) {
    try {
      var columns = eval(columnsDef[0]);
      for (var attr in columns) {
        if (attr == "config") {
          configOptions = columns[attr];
          continue;
        }
        var cur = columns[attr];

        if (["operation", "checkbox"].indexOf(attr) > -1 || cur.showInForm == false) {
          continue;
        }
        if (!cur.placeholder) {
          cur.placeholder = "请输入" + cur.headerCellName;
        }
        var item = {};
        item.label = cur.headerCellName;
        item.field = attr;
        merge(item, cur.formOptions);

        modelFormOptions.push(item);
      }
    } catch (e) {
      throw e;
    }
  }
  return {
    modelFormOptions: modelFormOptions,
    configOptions: configOptions
  };
}
