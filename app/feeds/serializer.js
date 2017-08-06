import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  primaryKey: 'id',
normalizeResponse(store, primaryModelClass, payload, id, requestType) {
  payload = {feeds : payload};
  console.log(payload);
  return this._super(store, primaryModelClass, payload, id, requestType);
}
});
