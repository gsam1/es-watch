const Feeds = require('../mongooseSchemas/gameModel.js');
exports.findAll = function(req, res) {
  const perPage = 50;
  const page = req.query.page > 0 && req.query.page !== undefined ? req.query.page : 0;

  console.log(page);
  console.log(perPage);
  console.log(page*perPage);

  Feeds.count({},function(err,count){
  Feeds.find({}, null, {
    sort: {
      published: 1
    }
  }).skip(page * perPage).limit(perPage).exec(function(err, docs) {
    if (err)
      res.json(err);
    else
      res.json({
        "TotalCount": count,
        "feeds": docs
      });
  });
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
