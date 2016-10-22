var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('services').push().key;
  res.json(global.db.ref('services/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  var search = 'services/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
module.exports = router;
