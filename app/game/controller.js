import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 0,
  index:0,
  meta: {},
  arrengedContent: [],
  slicedContent: [],

  endIndex:Ember.computed('index',function(){
    return this.get('index')+10;
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
    nextPage() {
      if (this.get('page') < this.get('metaData.totalCount')){
        this.incrementProperty('page');
      }
    },

    prevPage() {
      if (this.get('page') > 0) {
        this.decrementProperty('page');
      }
    },
    fetchMore: function(callback) {
      var promise = this.fetchMoreItems();
      callback(promise);
    },
    popOutElements(){
      let slices = this.get('slicedContent');
      if(slices.length === 0 ){
        this.set('index',this.get('index'));
        slices = this.get('arrengedContent').slice(this.get('index'),this.get('endIndex'));
        this.set('slicedContent',slices);
      }
      while(slices.length > 0){
        slice.pop();
      }
    }
  }


});
