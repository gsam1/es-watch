import Ember from 'ember';
import {URLParser} from 'ESApp/mixins/rota-bar-item';

export default Ember.Component.extend(URLParser,{
  tagName:'',
  url:Ember.Computed('game.url',function(){
    return urlParser(this.get('game.url'));
  })
});
