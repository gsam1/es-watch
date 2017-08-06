const Feeds = require('../mongooseSchemas/gameModel.js');

exports.findAll = function(req, res) {
  Feeds.find({}).exec(function(err, feeds)
  {
     if(err){ throw err; }
     res.send(feeds);
  });
}

exports.findByTitle = function(req, res) {
  const name = req.headers.name;
  console.log('Query for:' + name);
  console.log(req.headers);

  Feeds.find({title: { $regex: '.*' + name + '.*' } }).exec(function(err,feed)
  {
      if(err){ res.send(err); }
      res.json(feed);
  });
}

exports.findByCategory = function(req, res){
  const category = req.headers.category;
  console.log(req.headers);

  console.log('Query for:' + category);
  Feeds.find({}).where('category').equals(category).exec(function(err,feeds)
  {
      if(err){ res.send(err); }
      res.json(feeds);
  });
}
