var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var TokenSchema = new mongoose.Schema({
  email: 'string'
})
module.exports = mongoose.model('Tokens', TokenSchema);
