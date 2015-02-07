/**
 * Created by tms on 2014/8/14.
 */
'use strict';

module.exports = {
  host: '192.168.1.1',
  port: 80,
  url: 'http://www.teamwork.com',
  emailCfg: {
    type: 'smtp',
    host: 'smtp.qq.com',
    secure: true,   // was secureConnection
    port: 465,
    auth: {
      user: '1343362897@qq.com',
      pass: 'teamwork123'
    }
  }
};
