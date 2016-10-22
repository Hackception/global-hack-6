var express = require('express');
// var cocs = require('./routes/cocs');
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
router.route('/locations')
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
router.route('/programs')
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
router.route('/services')
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
//app.use('/locations',locationsRouter);
