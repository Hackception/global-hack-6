var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = global.db.ref().child('locations').push().key;
  res.json(global.db.ref('locations/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  global.db.ref('locations/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
module.exports = router;
