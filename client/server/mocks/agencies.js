module.exports = function(app) {
  var express = require('express');
  var agenciesRouter = express.Router();
  var agencies = ["分行", "办事处", "销售处", "营销部门", "外贸部", "国际站", "对外办证处"];
  agenciesRouter.get('/', function(req, res) {
    var ret = [];
    for (var i = 0; i < 10; i++) {
      var name = agencies[Math.floor(Math.random() * agencies.length)];
      ret.push({
        id: Math.random(),
        name: name,
        description:"I am " + name,
        created: new Date(),
        modified: new Date()
      })
    }
    res.send({
      "sysAgencies": ret,
      "meta": {
        totalPage: 1000
      }
    });
  });

  agenciesRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  agenciesRouter.get('/:id', function(req, res) {
    var sysAgency ={
      id: Math.random(),
      name: name,
      description:"I am " + name,
      created: new Date(),
      modified: new Date()
    };
    res.send({
      "sysAgency": sysAgency
    });
  });

  agenciesRouter.put('/:id', function(req, res) {
    res.send({
      "sysAgencies": {
        "id": req.params.id
      }
    });
  });

  agenciesRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/sysAgencies', agenciesRouter);
};
