// call the packages we need//
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parsem application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json


const port = process.env.PORT || 8080;
dbuser='ktzolev';
dbpassword='eswatch123';
mongoose.connect(`mongodb://ktzolev:eswatch123@ds123662.mlab.com:23662/eswatch`);


const Feeds = require('./mongooseSchemas/gameModel.js');
const router = express.Router();
const games = require('./Controllers/games.js');

router.get('/', function(req, res)
{
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });
});


router.get('/games',games.findAll);

router.get('/games/bytitle/',games.findByTitle);

router.get('/games/categories/',games.findByCategory);


app.on('error', function (err)
{
    console.error(err);
});



app.use(function (req, res, next)
{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("===========================");
    console.log('||Client IP|'+ ip + "|Port:" + port+"||");
    console.log("===========================");
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DEconstE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api',router);
app.listen(port);
console.log("==========================================================");
console.log('||Beers are served at: http://localhost:'+ port +" "+ app.settings.env+"||");
console.log("==========================================================");
