import TokenAuthenticator from '../authenticators/token';
export function initialize(container, application) {
  container.register('authenticator:token', TokenAuthenticator);
}

export default {
  name: 'auth',
  initialize: initialize
};
