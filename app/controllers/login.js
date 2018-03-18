import Ember from 'ember';
const { isEmpty } = Ember;
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  store: service(),
  identification: '',
  password: '',
  errorMessage: '',

  actions: {
    authenticate() {
      const {identification, password} = this.getProperties("identification", "password");
      
      return this.get('session').authenticate('authenticator:oauth2', identification, password).then(()=>{
        this._load();
      }).catch((reason) => {
        this.set('errorMessage', reason.error);
      });
    }
  },
  _load() {
    let userId = this.get('session.data.authenticated.user_id');
    
    if (!isEmpty(userId)) {
      
      return this.get('store').findRecord('user', userId).then(() => {
        this.get('store').pushPayload({token:this.get('session.data.authenticated')});
      });

    } else {
      return Ember.RSVP.resolve();
    }
  }
});
