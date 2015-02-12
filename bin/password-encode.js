var crypto = require('crypto');
var cipher = crypto.createCipher('aes-256-cbc', 'teamwork');

if (process.argv.length < 3) {
  throw new Error('email password can not be null in param');
}
var pass = process.argv[2];
var crypted = cipher.update(pass, 'utf8', 'hex');
crypted += cipher.final('hex');

console.log('encrypted password is:  ', crypted, '\n ' +
  ',please set it to app config.');
