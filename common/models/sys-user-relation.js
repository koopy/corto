module.exports = function (SysUserRelation) {
  SysUserRelation.excludeSerializered = true;
  SysUserRelation.definition.properties.created.default = function () {
    return new Date();
  };

  var oldFind = SysUserRelation.find;
  SysUserRelation.getApp(function (err, app) {
    SysUserRelation.find = function (filter, callback) {
      var connector = this.getDataSource().connector;
      var err = null;
      if (filter.where) {
        var where = filter.where;
        if (!where.principalType) {
          err = new Error("The principalType must be provided");
          throw err;
        }
        //TODO does not confirm principalType
        var include = filter.include;
        if (include.indexOf("sysUser") > -1) {

        }
        var model = SysUserRelation.modelName;
        var sql = "SELECT relation.* FROM sysUserRelation relation inner join " + include[0] + " on" +
          " relation.principalType='" + where.principalType + "' AND relation.objectId =" + where.objectId + " AND relation.objectId =" + include[0] + ".id";
        var self = connector;
        connector.query(sql, function (err, data) {
          if (err) {
            return callback(err, []);
          }
          var countSql = "SELECT count(*) as cnt FROM sysUserRelation relation inner join " + include[0] + " on" +
            " relation.principalType='" + where.principalType + "' AND relation.objectId =" + where.objectId + " AND relation.objectId =" + include[0] + ".id";
          ;

          connector.query(countSql, function (error, res) {
            if (error) {
              throw error;
            }
            var count = (res && res[0] && res[0].cnt) || 0;
            var totalPage = Math.ceil(count / (filter.limit || 10));
            var objs = data.map(function (obj) {
              return self.fromDatabase(model, obj);
            });
            if (filter && filter.include) {
              this._models[model].model.include(objs, filter.include, function (err, result) {
                callback(null, {
                  meta: {
                    totalPage: totalPage
                  },
                  sysUserRelations: result
                });
              });
            } else {
              callback(null, {
                meta: {
                  totalPage: totalPage
                },
                sysUserRelations: objs
              });
            }
          }.bind(this));
        }.bind(connector));
      }
    }
  });
};
