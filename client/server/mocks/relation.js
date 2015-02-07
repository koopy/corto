module.exports = function(app) {
  var express = require('express');
  var relationRouter = express.Router();
  var roles = ["高阶架构师x", "产品经理x", "销售经理x", "部门经理x", "总监x", "分行行长x", "办事处负责人x"];
  relationRouter.get('/sysUsers/:id/sysRoles', function(req, res) {
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
      "meta":{
        totalPage:100
      }
    });
  });

  app.use('/api', relationRouter);
};
