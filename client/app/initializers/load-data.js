export function initialize(container, application ) {
  var store = container.lookup('store:main');
  store.find('sysDict').then(function(sysDicts){
    console.log('The dicts has been loaded!');
  });
}

export default {
  name: 'load-data',
  after: 'store',
  initialize: initialize
};
