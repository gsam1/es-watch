import Oauth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';

export default Oauth2PasswordGrant.extend({
  serverTokenEndpoint: 'http://localhost:8080/api/users/authenticate/'
});
