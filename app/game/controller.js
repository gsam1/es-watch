import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['page'],
  page: 0,

  metaData: Ember.computed('model', function(){
    let meta = this.get('model.meta');
    meta.totalCount = this.get('model.meta.totalCount');
    meta.second_last = meta.totalCount - 1;
    meta.third_last = meta.totalCount - 2;
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
    }
  }


});
