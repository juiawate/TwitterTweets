var express = require('express');
var tweets = require('../modules/tweets');
var router = express.Router();
var flickr = require('../modules/flickr');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/twitter/search', function (req, res) {
  //console.log(req.body);
  tweets.search(req.body.term, function (err, tweets, result) {
    if (err) res.status(500).json({error: err});
    else res.status(200).json({result: tweets});
  })
});

router.post('/twitter/searchImages', function (req, res) {
  flickr.searchImage(req.body.term, function (err, data, result) {
    if(err) res.status(500).json({error: err});
    else res.status(200).json({images: data});
  });
});

module.exports = router;
