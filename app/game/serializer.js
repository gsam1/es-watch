import DS from 'ember-data';

export default DS.RESTSerializer.extend({
  primaryKey: '_id',
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    console.log(payload);
    payload = {game : payload.feeds};
    return this._super(store, primaryModelClass, payload, id, requestType);
  },
  extractMeta(store, typeClass, payload) {
    if (payload && payload.hasOwnProperty('meta')) {
      const meta = payload.meta;
      delete payload.meta;
      return meta;
    }
  }
});
