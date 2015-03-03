import Ember from 'ember';

export function initialize(container, application) {
  Ember.Route.reopen({
    titleToken:function(){
      if(Ember.FEATURES.isEnabled('ember-document-title')){
        return container.lookup('controller:application').get('currentPath');
      }
    }
  });
}

export default {
  name: 'reopen-route',
  initialize: initialize
};
