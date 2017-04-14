import Ember from 'ember';

export default Ember.Route.extend({
  model(){
    return this.store.createRecord('user')
  },
  actions:{
    save(newUser) {
      newUser.save().then(() => this.transitionTo('user'));
    },
    cancel() {
      // rollbackAttributes() removes the record from the store
      // if the model 'isNew'
      this.controller.get('user').rollbackAttributes();
    }
  }
});
