import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTSerializer.extend({
    primaryKey: 'id',
    serializeId: function(id) {
      return id.toString();
    },
    normalizePayload: function(payload) {
      return {
        'game': {
            id: payload.id,
            idkey: payload.idkey,
            game: payload.game,
            title: payload.title,
            description: payload.description,
            img: payload.img,
            url: payload.url
        }
    };
  }
});
