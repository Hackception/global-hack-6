var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var email = req.body.email;
  var key = global.db.ref().child('emails').push().key;
  global.db.ref().child('emails').child(key).set(email);
  res.json(key);
})

module.exports = router;
