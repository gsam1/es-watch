import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 0,
  index:0,
  meta: {},
  arrengedContent: [],
  slicedContent: [],

  endIndex:Ember.computed('index',function(){
    return this.get('index') + 10;
  }),
  metaData: Ember.computed('model', function(){
      let meta = this.get('meta');
      meta['second_last'] = meta.totalCount - 1;
      meta['third_last'] = meta.totalCount - 2;
      return meta;
    }),

  lastThreePages: Ember.computed('model', function(){
    if (this.get('page') < this.get('metaData.totalCount') - 3) {
      return false;
    } else {
      return true;
    }
  }),

  actions: {
    fetchMore() {
         if (Ember.$(window).scrollTop() === Ember.$(document).height() - Ember.$(window).height()){
           if (this.get('page') < this.get('metaData.totalCount')){
             this.incrementProperty('page');
           }
         } else if(Ember.$(window).scrollTop() === 0){
           if (this.get('page') > 0) {
             this.decrementProperty('page');
           }
       }
    }
  }
});
