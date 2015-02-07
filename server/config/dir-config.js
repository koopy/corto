var path = require('path');

function concatPath(dirName) {
  return path.join(__dirname, dirName);
}

module.exports = {
  appRootDir: path.normalize(__dirname + '/../'),
  appConfigRootDir: concatPath('app'),
  modelsRootDir: concatPath('model'),
  dsRootDir: concatPath('data-source')
};
