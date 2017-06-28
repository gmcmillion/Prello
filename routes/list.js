var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.json([]);
});


router.post('/', function(req, res) {
    res.json({
        title: 'Hihihi',
        cards: [],
        _id: 'adsffsdfsfadf'
    });
});

module.exports = router;