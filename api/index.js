var express = require('express');
var router = express.Router();

router.get('/test', (req, res) => {
  res.send("Test Route!");
});


module.exports = router;