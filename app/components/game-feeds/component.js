import Ember from 'ember';
import urlParser from '../../mixins/url-parser';

export default Ember.Component.extend(urlParser,{
  tagName:'',
  url: Ember.computed('game.url',function(){
    return this.get('game.url');
  })
});
