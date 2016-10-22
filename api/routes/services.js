var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = global.db.ref().child('services').push().key;
  res.json(global.db.ref('services/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  global.db.ref('services/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
module.exports = router;
