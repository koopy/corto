/**
 * Created by tms on 2014/8/14.
 */
'use strict';

/**
 *环境变量汇总：
 *TEAMWORK_DB:memory|mongo|{custom} required
 * TEAMWORK_HOST:'localhost'|{custom} required
 * TEAMWORK_PORT:27017|{custom} required
 * DB_USER:{custom}
 * DB_PASSWORD:{custom}
 *
 * TEAMWORK_ENV:'development'|'production'
 */
var dbEnv = process.env.TEAMWORK_DB || 'postgres';

var available = {
  memory: {
    name: 'db',
    connector: 'memory'
  },

  'postgres-local': {
    connector: 'postgresql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    database: 'teamwork',
    username: 'postgres',
    password: 'postgres'
  },

  postgres: {
    connector: 'postgresql',
    host: process.env.DB_HOST || '121.199.33.9',
    port: process.env.DB_PORT || 5432,
    database: 'teamwork',
    username: 'postgres',
    password: 'postgres'
  }
};

module.exports = {
  db: available[dbEnv]
};

