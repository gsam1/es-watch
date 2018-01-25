import Ember from 'ember';
const { inject: {service}, computed } = Ember;
export default Ember.Controller.extend({
  session: service('session'),
  isAuthenticated: computed.alias('session.isAuthenticated'),
  queryParams: ['page'],
  page: 0,
  index:0,
  meta: {},
  arrengedContent: [],
  slicedContent: [],
  chosenCat:'',
  chosenName:'',
  isLoading: false,
  toExpandFilterControls: false,

  endIndex:Ember.computed('index',function() {
    return this.get('index') + 10;
  }),

  metaData: Ember.computed('model', function() {
      let meta = this.get('meta');
      meta['second_last'] = meta.totalCount - 1;
      meta['third_last'] = meta.totalCount - 2;
      return meta;
    }),

  lastThreePages: Ember.computed('model', function() {
    if (this.get('page') < this.get('metaData.totalCount') - 3) {
      return false;
    } else {
      return true;
    }
  }),

  categories: Ember.computed('feeds', function() {
    let categories=[];
    const games = this.get('feeds');
    games.forEach((element) => {
      if(!categories.includes(element.get('category'))) {
        categories.push(element.get('category'));
      }
    });
    return categories;
  }),

  filteredItemsByName: Ember.computed('chosenName', function() {
    const name = this.get('chosenName');
    const feeds = this.get('arrengedContent');
    let results = [];
    if(name !== '' && name !== ' ') {
       results = feeds.filter(feed => feed.get('category').toLowerCase().indexOf(name.toLowerCase()) !== -1);
    }
    return results;
  }),

  actions: {
    fetchMore() {
      this.set('isLoading', true);
         if (Ember.$(window).scrollTop() === Ember.$(document).height() - Ember.$(window).height()) {
           if (this.get('page') < this.get('metaData.totalCount')) {
             this.incrementProperty('page');
           }
         } else if(Ember.$(window).scrollTop() === 0) {
           if (this.get('page') > 0) {
             this.decrementProperty('page');
           }
       }
    },

    filterByCategory(category) {
      this.set('chosenCat', '');
      const feeds = this.get('feeds');
      const results = feeds.filter(feed => feed.get('category') === category);
      if(results.length > 0 && category) {
        this.set('arrengedContent', results);
      }
      this.set('chosenCat', category);
    },

    filterByName(name) {
      this.set('chosenName',name);
    },

    expand() {
      this.toggleProperty('toExpandFilterControls');
    }
  }
});
