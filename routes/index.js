var express = require('express');
var router = express.Router();
var mytitle = 'Zulubow'
var products = [
  "/images/fashion.jpg",
  "/images/fashion1.jpg",
  "/images/fashion2.jpg",
  "/images/fashion3.jpg",
  "/images/fashion4.jpg",
  "/images/fashion5.jpg",
  "/images/fashion6.jpg",
  "/images/fashion7.jpg"
  ]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: mytitle, products:products });
});

module.exports = router;
