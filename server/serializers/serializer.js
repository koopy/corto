var Class = require('hydro-class');

function notImplement(methodName) {
  return function () {
    throw new Error(
        'Cannot call ' + methodName + '().' +
        ' The ' + methodName + ' method has not been implement.'
    );
  };
}

var Serializer = Class.extend({
  extract: notImplement('extract'),
  serialize: notImplement('serialize')
});

module.exports = Serializer;
