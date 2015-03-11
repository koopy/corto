var loopback = require('loopback');
module.exports = function (SysRoleRelation) {
  SysRoleRelation.excludeSerializered = true;
  SysRoleRelation.definition.properties.created.default = function () {
    return new Date();
  };

  var app = require('../../server/server');
  var oldFind = SysRoleRelation.find;

  function getFields(model){
    var modelName = model.modelName;
    var props = model.definition.properties;
    var ret=[];
    for(var field in props){
      ret.push(modelName+'.'+field+' AS '+'`'+modelName+'.'+field+'`');
    }
    return ret.join(',');
  }

  SysRoleRelation.findAllRoles = function(filter,callback){
    /**
     * step 1.
     * find all relation with user
     */
    var userId = filter.userId;

    var SysRole = app.models['sysRole'];
    var relationFields = getFields(SysRoleRelation);
    var roleFields = getFields(SysRole);
    var find= 'select '+[relationFields,roleFields].join(',')+' from sysRoleRelation inner join sysRole on sysRoleRelation.objectId = sysRole.id';
    find+=' where principalId in (';
    find+='select principalId from sysUserRelation where objectId =' + userId;
    find+=')';
    var connector = this.getDataSource().connector;


    connector.query(find,function(err,res){
      var ret = res.map(function (item) {
        var o=deepen(item, SysRole);
        var relation=o['sysRoleRelation'];
        relation['sysRole']=o['sysRole'];
        return relation;
      });
      callback(null, {
        sysRoleRelations: ret
      });
    });
  };

  function deepen(o) {
    var oo = {}, t, parts, part;
    for (var k in o) {
      t = oo;
      parts = k.split('.');
      var key = parts.pop();
      while (parts.length) {
        part = parts.shift();
        t = t[part] = t[part] || {};
      }
      t[key] = o[k];
    }
    return oo;
  }

  var typeName = SysRoleRelation.modelName;
  loopback.remoteMethod(SysRoleRelation.findAllRoles, {
    description: 'Find all roles by user id',
    accepts: {arg: 'filter', type: 'object', description: 'Filter defining fields, where, orderBy, offset, and limit'},
    returns: {arg: 'data', type: [typeName], root: true},
    http: {verb: 'get', path: '/findAllRoles'}
  });


  SysRoleRelation.getApp(function (err, app) {
    SysRoleRelation.finds = function (filter, callback) {
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
        var model = SysRoleRelation.modelName;
        var sql = "SELECT relation.* FROM sysRoleRelation relation inner join " + include[0] + " on" +
          " relation.principalType='" + where.principalType + "' AND relation.objectId =" + where.objectId + " AND relation.objectId =" + include[0] + ".id";
        var self = connector;
        connector.query(sql, function (err, data) {
          if (err) {
            return callback(err, []);
          }
          var countSql = "SELECT count(*) as cnt FROM sysRoleRelation relation inner join " + include[0] + " on" +
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
                  SysRoleRelations: result
                });
              });
            } else {
              callback(null, {
                meta: {
                  totalPage: totalPage
                },
                SysRoleRelations: objs
              });
            }
          }.bind(this));
        }.bind(connector));
      }
    }
  });
};
