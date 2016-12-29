import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('game', function() {
    this.route('details', {
      path: ':game_id'
    });
  });
  this.route('scores');
  this.route('user', function() {
    this.route('details', {
      path: ':user_id'
    });
  });

  this.route('users', {
    path: ':user_id'
  }, function() {});
});

export default Router;
