import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'localhost:8060',
  namespace: 'api/games'
});
