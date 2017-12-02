import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'',
  url:Ember.computed.alias('game.url')
});
