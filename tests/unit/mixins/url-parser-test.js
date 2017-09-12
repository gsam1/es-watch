import Ember from 'ember';
import UrlParserMixin from 'esapp/mixins/url-parser';
import { module, test } from 'qunit';

module('Unit | Mixin | url parser');

// Replace this with your real tests.
test('it works', function(assert) {
  let UrlParserObject = Ember.Object.extend(UrlParserMixin);
  let subject = UrlParserObject.create();
  assert.ok(subject);
});
