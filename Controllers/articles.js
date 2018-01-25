const Articles = require('../mongooseSchemas/article.js');
exports.findAll = function(req, res) {
  Articles.find({}).exec(function(err, articles) {
    if(err) throw err;
    console.log(articles);
     res.json(articles);
   });
}
