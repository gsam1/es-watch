import Ember from 'ember';
import FetchMoreMixin from 'esapp/mixins/fetch-more';
import { module, test } from 'qunit';

module('Unit | Mixin | fetch more');

// Replace this with your real tests.
test('it works', function(assert) {
  let FetchMoreObject = Ember.Object.extend(FetchMoreMixin);
  let subject = FetchMoreObject.create();
  assert.ok(subject);
});
