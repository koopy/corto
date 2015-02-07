/**
 * Created by tms on 2014/8/14.
 */
'use strict';

module.exports = {
  db: {
    connector: 'postgresql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    database: 'teamwork',
    username: 'postgres',
    password: '123456'
  }
};
