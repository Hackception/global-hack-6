var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('clients').push().key;
  res.json(global.db.ref('clients/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  var search = 'clients/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;

module.exports = router;
