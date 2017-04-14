import DS from 'ember-data';

export default DS.Model.extend({
  gid: DS.attr("string"),
  published: DS.attr("string"),
  category: DS.attr("string"),
  title: DS.attr("string"),
  url: DS.attr("string"),
  content: DS.attr("string"),
  img: DS.attr("string")
});
