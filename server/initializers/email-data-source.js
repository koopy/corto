var loopback = require('loopback');
var crypto = require('crypto');

function decode(emailCfg) {
  var pass = emailCfg.auth.pass;

  var decipher = crypto.createDecipher('aes-256-cbc', 'teamwork');
  var dec = decipher.update(pass, 'hex', 'utf8');
  dec += decipher.final('utf8');
  emailCfg.auth.pass = dec;
}


module.exports = function (server /*container*/) {
//  var emailCfg = server.get('emailCfg');
//  decode(emailCfg);
//
//  var mail = loopback.createDataSource({
//    connector: loopback.Mail,
//    transports: [
//      emailCfg
//    ]
//  });
//
////  server.dataSource('email', mail);
//  server.models.user.email.attachTo(mail);
};
