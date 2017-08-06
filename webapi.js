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

router.get('/', function(req, res)
{
	console.log({ message: 'hooray! welcome to our api!' });
	res.json({ message: 'hooray! welcome to our api!' });
});


router.get('/games',function(req, res)
{
       Feeds.find({}).exec(function(err, feeds)
       {
            if(err){ throw err; }
            res.send(feeds);
      });
});

router.get('/games/bytitle/',function(req, res)
{
    const name = req.headers.name;
    console.log('Query for:' + name);
    console.log(req.headers);

    Feeds.find({title: { $regex: '.*' + name + '.*' } }).exec(function(err,feed)
    {
        if(err){ res.send(err); }
        res.json(feed);
    });
});

router.get('/games/categories/',function(req, res)
{
    const category = req.headers.category;
    console.log(req.headers);

    console.log('Query for:' + category);
    Feeds.find({}).where('category').equals(category).exec(function(err,feeds)
    {
        if(err){ res.send(err); }
        res.json(feeds);
    });
});


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
