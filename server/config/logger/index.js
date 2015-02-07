/**
 * Created by tms on 2014/8/11.
 */
var winston = require('winston'),
  expressWinston = require('express-winston'),
  DailyRotateDirAndFile = require('./daily-rotate-dir-and-file'),
  config = require('./config.json'),
  env = process.env.NODE_ENV || 'development',
  logPath = process.env.LOG_PATH;

var EXIST_ON_ERROR = env === 'development';

var connectInfo = expressWinston.logger({
  transports: [
    new DailyRotateDirAndFile({
      filename: config.connect.fileName + '-info',
      datePattern: config.connect.datePattern || config.global.datePattern,
      maxsize: config.connect.maxSize || config.global.maxSize,
      json: config.connect.jsonFormat || config.global.jsonFormat,
      dirname: logPath || config.connect.dirName || config.global.dirName,
      segment: config.connect.segmentPattern || config.global.segmentPattern
    })
  ],
  meta: config.connect.meta,
  //customize the default logging message
  //E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  msg: config.connect.msg
});

var connectError = expressWinston.errorLogger({
  transports: [
    new DailyRotateDirAndFile({
      filename: config.connect.fileName + '-error',
      datePattern: config.connect.datePattern || config.global.datePattern,
      maxsize: config.connect.maxSize || config.global.maxSize,
      json: config.connect.jsonFormat || config.global.jsonFormat,
      dirname: logPath || config.connect.dirName || config.global.dirName,
      segment: config.connect.segmentPattern || config.global.segmentPattern
    })
  ],
  level: 'info',
  // different HTTP status codes caused log messages
  // to be logged at different levels (info/warn/error), the default is false
  statusLevels: config.connect.statusLevels
});

var debugLogger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      level: config.app.debugLevel[0],
      colorize: true,
      prettyPrint: true,
      handleExceptions: true
    }),
    new DailyRotateDirAndFile({
      filename: config.app.fileName + '-debug',
      datePattern: config.app.datePattern || config.global.datePattern,
      maxsize: config.app.maxSize || config.global.maxSize,
      json: config.app.jsonFormat || config.global.jsonFormat,
      dirname: logPath || config.app.dirName || config.global.dirName,
      segment: config.app.segmentPattern || config.global.segmentPattern,
      level: config.app.debugLevel[1],
      handleExceptions: true
    })
  ],
  exitOnError: EXIST_ON_ERROR
});

var logger = new (winston.Logger)({
  transports: [
    new DailyRotateDirAndFile({
      filename: config.app.fileName + '-info',
      datePattern: config.app.datePattern || config.global.datePattern,
      maxsize: config.app.maxSize || config.global.maxSize,
      json: config.app.jsonFormat || config.global.jsonFormat,
      dirname: logPath || config.app.dirName || config.global.dirName,
      segment: config.app.segmentPattern || config.global.segmentPattern,
      level: config.app.level,
      handleExceptions: true
    })
  ],
  exitOnError: EXIST_ON_ERROR
});

var errorLogger = new (winston.Logger)({
  transports: [
    new DailyRotateDirAndFile({
      filename: config.app.fileName + '-error',
      datePattern: config.app.datePattern || config.global.datePattern,
      maxsize: config.app.maxSize || config.global.maxSize,
      json: config.app.jsonFormat || config.global.jsonFormat,
      dirname: logPath || config.app.dirName || config.global.dirName,
      segment: config.app.segmentPattern || config.global.segmentPattern,
      level: config.app.errorLevel,
      handleExceptions: true
    })
  ],
  exitOnError: EXIST_ON_ERROR
});

module.exports = {
  connectInfo: connectInfo,
  connectError: connectError,
  debug: debugLogger.debug,
  info: logger.info,
  warn: logger.warn,
  error: errorLogger.error
};