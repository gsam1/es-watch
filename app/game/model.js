import DS from 'ember-data';

export default DS.Model.extend({
  published: DS.attr('String'),
  category: DS.attr('String'),
  url: DS.attr('String'),
  title: DS.attr('String'),
  submited_by: DS.attr('String'),
  gid: DS.attr('Number'),
  score: DS.attr('Number'),
  rank: DS.attr('Number'),
  upvotes: DS.attr('Number')
});
