import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model: function(params) {
    return this.store.query('game', params);
  },

  setupController(controller, model) {
    controller.setProperties({
      'arrengedContent': model,
      'meta': model.meta
    });
  },

  destroy() {
    this.set('queryParams.page',0);
  }
});
