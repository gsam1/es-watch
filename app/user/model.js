import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('number,'),
  userName: DS.attr('string,'),
  password: DS.attr('string,'),
  email: DS.attr('string,'),
  avatar: DS.attr('string,')
});
