'use strict';
// call the packages we need//
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
let games = [];
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as constn
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = process.env.PORT || 8080;
const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ASD1234asd',
  database : 'es-watch'
});

const router = express.Router();

/*class GAME {
  const title;
  const game;
  const img;
  const url;
  const description;

  constructor(title, game, img, url, description){
    this.title = title;
    this.game = game;
    this.img = img;
    this.url = url;
    this.description = description;
  };
  toString()
  {
    return
    "title: " + this.title +" "+
    "game: " + this.game +" "+
    "img: " + this.img +" "+
    "url: " + this.url +" "+
    "description: " + this.description +" ";
  };
}*/

router.get('/', function(req, res)
{
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });
});


router.get('/games',function(req, res)
{
  connection.connect();

  connection.query("SELECT * FROM `games-feed` LIMIT 100", function(err, rows, fields) {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    return res.json(JSON.stringify(rows));
  });
  connection.end();
});

app.on('error', function (err)
{
    console.error(err);
});

app.use(function (req, res, next)
{
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log("===========================");
  console.log('||Client IP|'+ ip + "|Port:" + port+"||");
  console.log("===========================");
  next();
});

app.use('/api',router);
app.listen(port);
console.log("==========================================================");
console.log('||Beers are served at: http://localhost:'+ port +" "+ app.settings.env+"||");
console.log("==========================================================");
