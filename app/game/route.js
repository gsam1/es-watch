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
      'slicedContent':model.slice(0,10),
      'meta': model.meta,
      'page': '',
      'index': 0
    });
  },

  destroy() {
    this.set('queryParams.page',0);
  }
});
