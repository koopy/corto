//publish to server
/**
 * 1.sync remote git repository
 * 2.read config(env:production)
 * 3.set config
 * 4.set version
 * 5.set project tag
 * 6.dist files
 * 6.publish
 * 7.set environment NODE_ENV : production
 * 8.start project in remote server
 */
// push server
/**
 * sync at local
 *    1.sync
 *    2.run tests(frontend and backend)
 *    3.set project tag
 *    4.
 *    5.read production server config
 *
 */

//export the production environment
//for config file && datasource && client build
process.env.EMBER_ENV = process.env.NODE_ENV = 'production';
process.env.LOG_PATH = '/home/git/logs/teamwork';
process.env.DB_HOST = 'https://www.teamwork.com';
process.env.DB_PORT = '27017';
process.env.DB_USER = 'evada';
process.env.DB_PASSWORD = 'evada';
process.env.DEBUG_MODE = false;
process.env.DEBUG = false;
process.env.REDIS_PORT = 6379;
process.env.REDIS_HOST = '121.199.33.9';
