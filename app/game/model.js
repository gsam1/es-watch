import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('number,'),
  game: DS.attr('string'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  imgURL: DS.attr('string'),
  url: DS.attr('string')
});
