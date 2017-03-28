'use strict';
// call the packages we need//
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 8080;
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'ASD1234asd',
  database : 'es-watch'
});

const router = express.Router();
const games = [];

app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as constn
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', (req, res) => {
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/games',(req, res) => {
  connection.query("SELECT * FROM `games-feed` LIMIT 100", (err, rows, fields) => {
    if (err) throw err;
    console.log(JSON.stringify(rows));
    return res.json(rows);
  });
});

app.on('error', (err) => {
    console.error(err);
});

app.use( (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
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
