var loopback = require('loopback');
var inflection = require('inflection');
exports.findExclude = function findExclude(filter, cb) {
  if (stillConnecting(this.getDataSource(), this, arguments)) return;

  if (arguments.length === 1) {
    cb = filter;
    filter = null;
  }

  filter = filter || {};

  try {
    this._normalize(filter);
  } catch (err) {
    return process.nextTick(function () {
      cb && cb(err);
    });
  }

  this.applyScope(filter);
  var model = this;
  var modelName = model.modelName;
  var connector = this.getDataSource().connector;
  var type = filter.type;
  var id = filter.id;
  var err = null;
  if (!(type && id)) {
    err = new Error('The exclude method need : type and id to filter match result');
    throw err;
  }

  var self = connector;
  // Order by id if no order is specified
  if (!filter.order) {
    var idNames = self.idNames(modelName);
    if (idNames && idNames.length) {
      filter.order = idNames;
    }
  }

  var root = inflection.camelize(model.pluralModelName, true);

  var sql = 'SELECT ' + self.getColumns(modelName, filter.fields) + ' FROM ' + self.tableEscaped(modelName);
  sql += " where id NOT IN (SELECT relation.principalId FROM sysUserRelation relation inner join " + modelName + " on" +
    " relation.principalType='" + modelName + "' AND relation.objectId =" + id + " AND relation.objectId =" + modelName + ".id)";
  if (filter) {

    if (filter.where) {
      sql += ' ' + self.buildWhere(modelName, filter.where);
    }

    if (filter.order) {
      sql += ' ' + buildOrderBy(self, modelName, filter.order);
    }

    if (filter.limit) {
      sql += ' ' + buildLimit(filter.limit, filter.skip || filter.offset || 0);
    }

  }

  self.query(sql, function (err, data) {
    if (err) {
      return callback(err, []);
    }

    var countSql = 'SELECT count(*) as cnt FROM ';
    countSql += '(' + sql + ')';
    countSql += 'AS result';
    connector.query(countSql, function (error, res) {
      if (error) {
        throw error;
      }
      var count = (res && res[0] && res[0].cnt) || 0;
      var totalPage = Math.ceil(count / (filter.limit || 10));
      var objs = data.map(function (obj) {
        return self.fromDatabase(modelName, obj);
      });
      if (filter && filter.include) {
        this._models[modelName].model.include(objs, filter.include, function (err, result) {
          var ret = {};
          ret[root] = result;
          ret.meta = {
            totalPage: totalPage
          };
          cb(null, ret);
        });
      } else {
        var ret = {};
        ret[root] = objs;
        ret.meta = {
          totalPage: totalPage
        };
        cb(null, ret);
      }
    }.bind(this));
  }.bind(self));

  return sql;
};
exports.setupExclude = function (remoteMethod,model) {
  var typeName = model.modelName;
  loopback.remoteMethod(remoteMethod, {
    description: 'Find models exclude by the filter with type and id for relation',
    accepts: {arg: 'filter', type: 'object', description: 'Filter defining fields, where, orderBy, offset, and limit'},
    returns: {arg: 'data', type: [typeName], root: true},
    http: {verb: 'get', path: '/exclude'}
  });
}


function stillConnecting(dataSource, obj, args) {
  return dataSource.ready(obj, args);
}

function buildOrderBy(self, model, order) {
  if (typeof order === 'string') {
    order = [order];
  }
  return 'ORDER BY ' + order.map(function (o) {
    var t = o.split(/[\s,]+/);
    if (t.length === 1) {
      return self.columnEscaped(model, o);
    }
    return self.columnEscaped(model, t[0]) + ' ' + t[1];
  }).join(', ');
}

function buildLimit(limit, offset) {
  if (isNaN(limit)) {
    limit = 0;
  }
  if (isNaN(offset)) {
    offset = 0;
  }
  return 'LIMIT ' + (offset ? (offset + ',' + limit) : limit);
}