/**
 * Created by weiyang on 15-2-10.
 */
import Base from 'simple-auth/authenticators/base';

var Configuration = {
  serverTokenEndpoint: 'api/users/login',
  serverTokenRevocationEndpoint: 'api/users/logout',
  identificationAttributeName: 'username',
  tokenAttributeName: 'accessToken',
  expireAttributeName: 'ttl',
  createdAttributeName:'created'
};

export default Base.extend({
  serverTokenEndpoint: '/token',
  serverTokenRevocationEndpoint: null,
  identificationAttributeName:'username',
  refreshAccessTokens: false,

  /**
   @property _refreshTokenTimeout
   @private
   */
  _refreshTokenTimeout: null,

  /**
   @method init
   @private
   */
  init: function() {
    this.serverTokenEndpoint = Configuration.serverTokenEndpoint || this.serverTokenEndpoint;
    this.serverTokenRevocationEndpoint = Configuration.serverTokenRevocationEndpoint || this.serverTokenRevocationEndpoint;
    this.refreshAccessTokens           = !!Configuration.refreshAccessTokens;
    this.identificationAttributeName = Configuration.identificationAttributeName || this.identificationAttributeName;
  },

  normalizePayload: function(payload) {
    Ember.assert('The payload does not contain ' + Configuration.tokenAttributeName, payload[Configuration.tokenAttributeName]);
    var token = payload[Configuration.tokenAttributeName];
    var expire = token[Configuration.expireAttributeName];
    var created = token[Configuration.createdAttributeName];
    delete token[Configuration.expireAttributeName];
    token['expires_at'] = new Date(created).getTime() + expire;
    return token;
  },
  restore: function(data) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var now = (new Date()).getTime();
      if (!Ember.isEmpty(data.expires_at) && data.expires_at < now) {
        //TODO refresh token
        if (_this.refreshAccessTokens) {
          _this.refreshAccessToken(data.expires_in, data.refresh_token).then(function(data) {
            resolve(data);
          }, reject);
        } else {
          reject();
        }
      } else {
        if (Ember.isEmpty(data)) {
          reject();
        } else {
          _this.scheduleAccessTokenRefresh(data.expires_in, data.expires_at, data.refresh_token);
          resolve(data);
        }
      }
    });
  },
  authenticate: function(credentials) {
    var _this = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var data = {
        password: credentials.password
      };
      data[_this.identificationAttributeName] = credentials.identification;
      _this.makeRequest(_this.serverTokenEndpoint, data).then(function(response) {
        Ember.run(function() {
          //TODO schedule token refresh
//          var expiresAt = _this.absolutizeExpirationTime(response.expires_in);
//          _this.scheduleAccessTokenRefresh(response.expires_in, expiresAt, response.refresh_token);
//          if (!Ember.isEmpty(expiresAt)) {
//            response = Ember.merge(response, { expires_at: expiresAt });
//          }
          var payload = _this.normalizePayload(response);
          resolve(payload);
        });
      }, function(xhr, status, error) {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  /**
   Cancels any outstanding automatic token refreshes and returns a resolving
   promise.

   @method invalidate
   @param {Object} data The data of the session to be invalidated
   @return {Ember.RSVP.Promise} A resolving promise
   */
  invalidate: function(data) {
    var _this = this;
    function success(resolve) {
      Ember.run.cancel(_this._refreshTokenTimeout);
      delete _this._refreshTokenTimeout;
      resolve();
    }
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(_this.serverTokenRevocationEndpoint)) {
        //TODO query string or headers or post body
        _this.makeRequest(_this.serverTokenRevocationEndpoint + '?access_token=' + data.id).then(function () {
            success(resolve);
          }).fail(function (reason) {
            reject(reason);
          });
      } else {
        success(resolve);
      }
    });
  },

  /**
   @method scheduleAccessTokenRefresh
   @private
   */
  scheduleAccessTokenRefresh: function(expiresIn, expiresAt, refreshToken) {
    var _this = this;
    if (this.refreshAccessTokens) {
      var now = (new Date()).getTime();
      if (Ember.isEmpty(expiresAt) && !Ember.isEmpty(expiresIn)) {
        expiresAt = new Date(now + expiresIn * 1000).getTime();
      }
      var offset = (Math.floor(Math.random() * 5) + 5) * 1000;
      if (!Ember.isEmpty(refreshToken) && !Ember.isEmpty(expiresAt) && expiresAt > now - offset) {
        Ember.run.cancel(this._refreshTokenTimeout);
        delete this._refreshTokenTimeout;
        if (!Ember.testing) {
          this._refreshTokenTimeout = Ember.run.later(this, this.refreshAccessToken, expiresIn, refreshToken, expiresAt - now - offset);
        }
      }
    }
  },

  /**
   @method refreshAccessToken
   @private
   */
  refreshAccessToken: function(expiresIn, refreshToken) {
    var _this = this;
    var data  = { grant_type: 'refresh_token', refresh_token: refreshToken };
    return new Ember.RSVP.Promise(function(resolve, reject) {
      _this.makeRequest(_this.serverTokenEndpoint, data).then(function(response) {
        Ember.run(function() {
          expiresIn     = response.expires_in || expiresIn;
          refreshToken  = response.refresh_token || refreshToken;
          var expiresAt = _this.absolutizeExpirationTime(expiresIn);
          var data      = Ember.merge(response, { expires_in: expiresIn, expires_at: expiresAt, refresh_token: refreshToken });
          _this.scheduleAccessTokenRefresh(expiresIn, null, refreshToken);
          _this.trigger('sessionDataUpdated', data);
          resolve(data);
        });
      }, function(xhr, status, error) {
        Ember.Logger.warn('Access token could not be refreshed - server responded with ' + error + '.');
        reject();
      });
    });
  },

  /**
   @method absolutizeExpirationTime
   @private
   */
  absolutizeExpirationTime: function(expiresIn) {
    if (!Ember.isEmpty(expiresIn)) {
      return new Date((new Date().getTime()) + expiresIn * 1000).getTime();
    }
  },
  makeRequest:function(url,data){
    return Ember.$.ajax({
      url:         url,
      type:        'POST',
      data:        data,
      dataType:    'json',
      contentType: 'application/x-www-form-urlencoded'
    });
  }

});
