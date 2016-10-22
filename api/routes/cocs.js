var express = require('express');
var firebase = require('firebase');
var router = express.Router();
router.route('/cocs')
.post(function(req, res) {
  var newPostKey = global.db.ref().child('cocs').push().key;
  res.json(global.db.ref('cocs/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  global.db.ref('cocs/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
module.exports = router;
