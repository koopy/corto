/**
 * Created by tms on 2014/8/12.
 */
var winston = require('winston'),
  DailyRotateFile = winston.transports.DailyRotateFile,
  path = require('path'),
  fs = require('fs'),
  mkdirp = require('mkdirp');

var DailyRotateDirAndFile =
  winston.transports.DailyRotateDirAndFile = function (options) {
    DailyRotateFile.call(this, options);

    this.segment = options.segment || 'yyyy/yyyy-MM/yyyy-MM-dd';

    var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhM])\1?/g,
      pad = function (val, len) {
        val = String(val);
        len = len || 2;
        while (val.length < len) val = '0' + val;
        return val;
      };

    this.getFormattedSeg = function () {
      var flags = {
        yy: String(this._year).slice(2),
        yyyy: this._year,
        M: this._month + 1,
        MM: pad(this._month + 1),
        d: this._date,
        dd: pad(this._date),
        H: this._hour,
        HH: pad(this._hour),
        m: this._minute,
        mm: pad(this._minute)
      };
      return this.segment.replace(token, function ($0) {
        return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
      });
    };
  };

DailyRotateDirAndFile.prototype = Object.create(DailyRotateFile.prototype);
DailyRotateDirAndFile.prototype.constructor = DailyRotateDirAndFile;

DailyRotateDirAndFile.prototype.name = 'dailyRotateDirAndFile';

DailyRotateDirAndFile.prototype._getFile = function (inc) {
  var filename = this._basename + this.getFormattedDate(),
    segment = this.getFormattedSeg(),
    fullName = path.join(segment, filename),
    folder = path.join(this.dirname, segment),
    remaining;

  if (inc) {
    //
    // Increment the number of files created or
    // checked by this instance.
    //
    // Check for maxFiles option and delete file
    if (this.maxFiles && (this._created >= (this.maxFiles - 1))) {
      remaining = this._created - (this.maxFiles - 1);
      if (remaining === 0) {
        fs.unlinkSync(path.join(this.dirname, fullName));
      }
      else {
        fs.unlinkSync(path.join(this.dirname, fullName + '.' + remaining));
      }
    }

    this._created += 1;
  }

  if (!fs.existsSync(folder)) {
    mkdirp.sync(folder);
  }

  return this._created ? fullName + '.' + this._created
    : fullName;
};

module.exports = DailyRotateDirAndFile;