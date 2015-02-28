export function initialize(container, application) {
  var lang = Ember.$.cookie('lang');
  application.set('locale', lang);
//  var router = container.lookup('router:main');
//  router.set('rootURL',lang);
}

export default {
  name: 'init-locale',
  initialize: initialize
};
