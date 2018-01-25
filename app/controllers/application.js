import Ember from 'ember';
const { service } = Ember.inject;
const { computed } = Ember;

export default Ember.Controller.extend({
  session: service('session'),
  isAuthenticated: computed.alias('session.isAuthenticated'),

  actions:{
    logout(){
      this.get('session').invalidate();
    }
  }
});
