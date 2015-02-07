module.exports = function (app) {
  var express = require('express');
  var dutiesRouter = express.Router();
  var duties = ["开发工程师", "产品经理", "测试工程师", "美工", "架构师", "运维", "市场营销"];
  dutiesRouter.get('/', function (req, res) {
    var ret = [];
    for (var i = 0; i < 10; i++) {
      var name = duties[Math.floor(Math.random() * duties.length)];
      ret.push({
        id: Math.random(),
        name: name,
        code: "jwy"+i,
        description:"I am " + name,
        created: new Date(),
        modified: new Date()
      })
    }
    res.send({
      "sysDuties": ret,
      "meta": {
        totalPage: 1000
      }
    });
  });

  dutiesRouter.post('/', function (req, res) {
    res.status(201).end();
  });

  dutiesRouter.get('/:id', function (req, res) {
    var sysDuty={
      id: Math.random(),
      name: name,
      code: "jwy"+i,
      description:"I am " + name,
      created: new Date(),
      modified: new Date()
    };
    res.send({
      "sysDuty":sysDuty
    });
  });

  dutiesRouter.put('/:id', function (req, res) {
    res.send({
      "sysDuties": {
        "id": req.params.id
      }
    });
  });

  dutiesRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/sysDuties', dutiesRouter);
};
