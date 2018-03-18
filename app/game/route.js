import Ember from 'ember';
const { inject: { service }, RSVP } = Ember;

export default Ember.Route.extend({
  session: service('session'),
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model (params) {
    return RSVP.hash({
      feeds: this.store.query('game', params),
      user: this.store.peekAll('token'),
    });
  },

  setupController(controller, model) {
    console.log(model.user);
    controller.setProperties({
      'arrengedContent': model.feeds,
      'feeds': model.feeds,
      'meta': model.meta,
      'isLoading': false,
      'page': '',
      'index': 0
    });
  },

  destroy() {
    this.set('queryParams.page',0);
  }
});
