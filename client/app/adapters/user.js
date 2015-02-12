import Ember from 'ember';
import ApplicationAdapter from './application';

var get = Ember.get;
export default
ApplicationAdapter.extend({
  /**
   * Login a user with username/email and password
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param credentials {Object}
   * @param include {String} only valid value is 'user',others will be ignored.
   * @returns {Promise}
   */
  login: function (store, type, credentials, include) {
    return this.ajax(this.appendURL(type.typeKey, "login/"), "POST", {data: credentials});
  },
  /**
   * Logout a user with access token
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param tokenId {String}
   * @returns {Promise}
   */
  logout: function (store, type, tokenId) {
    return this.ajax(this.appendURL(type.typeKey, "logout"), "POST", {data: {access_token: tokenId}});
  },
  /**
   * Confirm a user registration with email verification toke
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param uid {Number}
   * @param token {String}
   * @param redirect {String}
   * @returns {Promise}
   */
  confirm: function (store, type, uid, token, redirect) {
    return this.ajax(this.appendURL(type.typeKey, "confirm"), "GET", {data: {uid: uid, token: token, redirect: redirect}});
  },
  /**
   * Reset password for a user with email
   * @param {DS.Store} store
   * @param {subclass of DS.Model} type
   * @param options {Object} and field 'email' is required
   * @returns {Promise}
   */
  resetPassword: function (store, type, options) {
    return this.ajax(this.appendURL(type.typeKey, "reset"), "POST", {data: options});
  }
});