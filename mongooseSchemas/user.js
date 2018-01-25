var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  username: 'string',
  password: 'string',
  avatar: 'string',
  email: 'string',
})
module.exports = mongoose.model('Users', UserSchema);
