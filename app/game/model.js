import DS from 'ember-data';

export default DS.Model.extend({
  published: DS.attr(),
  category: DS.attr(),
  url: DS.attr(),
  content: DS.attr(),
  img: DS.attr()
});
