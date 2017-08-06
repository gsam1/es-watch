import DS from 'ember-data';

export default DS.Model.extend({
  published: DS.attr('string'),
  category: DS.attr('string'),
  url: DS.attr('string'),
  content: DS.attr('string'),
  img: DS.attr('string')
});
