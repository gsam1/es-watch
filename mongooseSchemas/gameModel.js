var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var FeedsSchema = new mongoose.Schema({
  published: 'date',
  category: 'string',
  content: 'string',
  title: 'string',
  url: 'string',
})
module.exports = mongoose.model('Feeds', FeedsSchema);
