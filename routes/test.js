var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
    res.end("Test");
});

module.exports = router;