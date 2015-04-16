import lazyMap from 'corto/utils/lazy-map';

export function initialize(container, application) {
  var session = container.lookup('simple-auth-session:main');

  session.on('sessionAuthenticationSucceeded',function(){
    lazyMap(container,application,['sys:user:create_user','sys:user:delete_user']);
  });

}
export default {
  name: 'authentication',
    after: 'simple-auth',
    initialize: initialize
};
