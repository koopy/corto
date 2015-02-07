/**
 * 数据库迁移初始化
 * @param server
 * @param container
 */
module.exports = function (server /*, container*/) {
  var isDevEnv = server.get('isDevEnv')||true;

  if (isDevEnv) {
    server.dataSources.db.autoupdate();
  }
};
