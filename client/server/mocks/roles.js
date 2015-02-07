module.exports = function(app) {
  var express = require('express');
  var rolesRouter = express.Router();
  var roles = ["高阶架构师", "产品经理", "销售经理", "部门经理", "总监", "分行行长", "办事处负责人"];
  rolesRouter.get('/', function(req, res) {
    var ret = [];
    for (var i = 0; i < 10; i++) {
      var name = roles[Math.floor(Math.random() * roles.length)];
      ret.push({
        id: Math.random(),
        name: name,
        description:"I am " + name,
        created: new Date(),
        modified: new Date()
      })
    }
    res.send({
      "sysRoles": ret,
      "meta": {
        totalPage: 1000
      }
    });
  });

  rolesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  rolesRouter.get('/:id', function(req, res) {
    var name =roles[Math.floor(Math.random() * roles.length)];
    var sysRole ={
      id: Math.random(),
      name: name,
      description:"I am " + name,
      created: new Date(),
      modified: new Date()
    };
    res.send({
      "sysRole": sysRole
    });
  });

  rolesRouter.put('/:id', function(req, res) {
    res.send({
      "sysRoles": {
        "id": req.params.id
      }
    });
  });

  rolesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/sysRoles', rolesRouter);
};
