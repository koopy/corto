import Ember from 'ember';

//TODO analysis all possible exception and decide how to design
export function initialize(container, application) {
  Ember.onerror = function () {
    console.warn('something error');
  };
  Ember.RSVP.configure('onerror', function(error) {
    console.log('rsvp error');
  });
  Ember.$(document).ajaxError(function(e, xhr, options, thrownError){
    container.lookup('router:main').send('httpError', e, xhr, options, thrownError);
  });
}

export default {
  name: 'http-errors',
  initialize: initialize
};
