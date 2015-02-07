/**
 * Created by tms on 2014/8/14.
 * Anything that app needs can be exposed here,
 * and then could be accessed via app.get('option-name')
 * where app is an instance of loopback after app boots.
 */
'use strict';

var isDevEnv = (process.env.NODE_ENV || 'development') === 'development';

var A_DAY_SECONDS = 24 * 60 * 60;

module.exports = {
  isDevEnv: isDevEnv,
  cookieDuration: 7 * A_DAY_SECONDS,
  emailCfg: {
    type: 'smtp',
    host: 'smtp.qq.com',
    secure: true,   // was secureConnection
    port: 465,
    auth: {
      user: '1343362897@qq.com',
      pass: '1c3cf99b11aac0394e4257bf9e45a17e'
    }
  }

};
