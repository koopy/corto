module.exports = function (app) {
  var express = require('express');
  var usersRouter = express.Router();
  var runman = ["邓超", "李晨", "AngelaBaby", "郑凯", "陈赫", "王祖蓝", "王宝强"];
  usersRouter.get('/', function (req, res) {
    var query = req.query;
    var ret = [];
    for (var i = 0; i < 10; i++) {
      ret.push({
        id: Math.random(),
        nickname: runman[Math.floor(Math.random() * runman.length)],
        username: "jwy" + i,
        status: i % 2 == 0,
        sex: i % 2 == 0,
        email: "294358991@qq.com",
        phone: "18250801825",
        telephone: "0592-8715693",
        homeTel: "059587517522",
        address: "福建厦门",
        modified: new Date()
      })
    }
    res.send({
      "sysUsers": ret,
      "meta": {
        totalPage: 99
      }
    });
  });

  usersRouter.post('/', function (req, res) {
    var user={
      id:Math.random(),
      nickname:"jwynew",
      username:"jwynewadd"
    };
    res.send({
      "sysUser":user
    });
  });

  usersRouter.get('/:field/uniqueness', function (req, res) {
    res.status(201).end();
  });

  usersRouter.get('/:id', function (req, res) {
    var id = req.params.id;
    if (id == 123) {
      res.status(404).end();
      return;
    }
    var sysUser = {
      id: Math.random(),
      nickname: runman[Math.floor(Math.random() * runman.length)],
      username: "jwy",
      status: true,
      sex: false,
      email: "294358991@qq.com",
      phone: "18250801825",
      telephone: "0592-8715693",
      homeTel: "059587517522",
      address: "福建厦门",
      modified: new Date()
    };
    res.send({
      "sysUser": sysUser
    });
  });

  usersRouter.put('/:id', function (req, res) {
    var id = req.params.id;
    var sysUser = {
      id: id,
      nickname: runman[Math.floor(Math.random() * runman.length)],
      username: "jwyedited",
      status: true,
      modified: new Date()
    };
    res.send({
      "sysUser": sysUser
    });
  });

  usersRouter.delete('/:id', function (req, res) {
    res.status(204).end();
  });

  app.use('/api/sysUsers', usersRouter);
};
