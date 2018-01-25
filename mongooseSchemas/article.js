var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ArticlesSchema = new mongoose.Schema({
  category: 'string',
  submited_by: 'string',
  gid: 'string',
  score: 'number',
  published: 'string',
  upvotes: 'number',
  title: 'string',
  rank: 'number',
  url: 'string',
})
module.exports = mongoose.model('Articles', ArticlesSchema);
