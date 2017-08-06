import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    payload = {
      game : payload.feeds,
      meta: payload.meta
    };
    return this._super(store, primaryModelClass, payload, id, requestType);
  }
});
