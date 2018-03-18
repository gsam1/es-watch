import DS from 'ember-data';
const { attr } = DS;
export default DS.Model.extend({
  name: attr('string'),
  password: attr('string'),
  confirmPassword: attr('string'),
  avatar: attr('string'),
  email: attr('string'),
});
