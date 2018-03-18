import Ember from 'ember';
import env from '../config/environment';

const {service} = Ember.inject;
const {$, set} = Ember;

export default Ember.Controller.extend({
  session: service('session'),
  store: service(),
  errorMessage: '',

  actions: {
  
    register() {
      const url = 'users/create';      
      let newUser = this.get('user');

      console.log(newUser);
      if(newUser.get('password') !== newUser.get('confirmPassword')) {
        set(this, 'errorMessage', 'Two passwords must match!');
        return;
      }
      $.ajax({
        type: 'POST',
        url: `${env.apiBaseUrl}${url}`,
        data: JSON.parse(JSON.stringify(newUser))
      }).catch((reason) => {
        set(this, 'errorMessage', reason);
        newUser = null;
        console.error(reason);
      }); 
      // if(newUser) {
      //   get(this, 'session').authenticate('authenticator:oauth2',    
      //   newUser.get('email'), newUser.get('password')).catch((reason) => {
      //     set(this, 'errorMessage', reason.error ||reason);
      //     console.error(reason);        
      //   });
      // } 
    }
  }
});  