import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Controller.extend({
  session: service('session'),
  identification: '',
  password: '',
  errorMessage: null,

  actions: {
    authenticate() {
      alert(this.getProperties("identification", "password"))
      const {identification, password} = this.getProperties("identification", "password");
      console.log(identification);
      console.log(password);
      return this.get('session').authenticate('authenticator:devise', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error);
        console.log(reason.error)
      });
    }
  }
});
