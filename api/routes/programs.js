var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = global.db.ref().child('programs').push().key;
  res.json(global.db.ref('programs/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  global.db.ref('programs/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
module.exports = router;
