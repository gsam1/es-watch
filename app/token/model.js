import DS from 'ember-data';
const {attr} = DS;

export default DS.Model.extend({
  success: attr('Boolean'),
  message: attr('String'),
  token: attr('String'),
  email: attr('String')
});
