const Users = require('../mongooseSchemas/user.js');
const Token = require('../mongooseSchemas/token.js');
const moment = require('moment');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const config = require('../config');

exports.findAll = function(req, res) {
  Users.find({}).exec(function(err, users) {
    if(err) throw err;
    console.log(users);
     res.json(users);
   });
}

exports.authenticate = function(req, res) {
  const {email, password} = req.body.user ? req.body.user : req.body;
  console.log(email)
  console.log(password)

  // find the user
  Users.find({email: email }).exec(function(err, user) {
    if (err) throw err;
    let jsonUser = {};
    jsonUser = JSON.parse(JSON.stringify(user));
    console.log(jsonUser);

    if (!jsonUser[0]) {
      res.status(400).send({ message: 'Authentication failed. User not found.' });
    } else if (jsonUser[0]) {
      console.log('Valide User');
      const cryptoText = _encryptData({ mail: jsonUser[0].email, pass: jsonUser[0].password });
      // check if password matches
      if (password === jsonUser[0].password) {
        const payload = {
          admin: jsonUser[0],
          email: jsonUser[0].email,
          expiresInMinutes: 1440
        };
        console.log(config.secret)
        const token = jwt.sign(payload, config.secret, {expiresIn: 120});
        const t = new Token(payload);

        t.save().then((item) => {
          console.log("item saved to database:\n" + item);
        })
        .catch((err) => {
          console.log("unable to save to database " + err);
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          email: jsonUser[0].email
        });

        } else {
          res.status(401).send({error: 'Authentication failed. Wrong password.'});
      }
    }
  });
}
exports.findOne = function(req, res, next) {

 }
_encryptData = function (data) {
  // Encrypt
   const cryptoText = CryptoJS.AES.encrypt(JSON.stringify(data), `${data.mail}${data.pass}`);
   console.log(data);
  return cryptoText.toString();
}
_decryptData = function (data) {
  const bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), `${data.mail}${data.pass}`);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
