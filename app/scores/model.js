import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('number,'),
  game: DS.attr('string'),
  team1: DS.attr('string'),
  team2: DS.attr('string')
});
