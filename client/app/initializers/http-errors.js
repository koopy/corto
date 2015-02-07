export function initialize(container, application) {
  Ember.$(document).ajaxError(function(e, xhr, options, thrownError){
    container.lookup('router:main').send('httpError', e, xhr, options, thrownError)
  });
}

export default {
  name: 'http-errors',
  initialize: initialize
};
