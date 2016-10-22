var express = require('express');
// var firebase = require('firebase');
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
router.route('/cocs/locations')
.get(function(req, res) {
  var cocsId = req.body.cocsId;
  global.db.ref('cocs/' + cocsId + '/locations/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
.post(function(req, res) {
  var cocsId = req.body.cocsId;
  var locationId = req.body.locationId;
  var locationData;
  var cocsData;
  global.db.ref('locations/' + locationId).once('value').then(function(snapshot) {
    locationData = snapshot.val();
    locationData.cocs = locationData.cocs || {};
    locationData.cocs[cocsId] = true;
  }).then(function() {
    global.db.ref('locations/' + locationId).set(locationData);
  });
  global.db.ref('cocs/' + cocsId).once('value').then(function(snapshot) {
    cocsData = snapshot.val();
    cocsData.locations = cocsData.locations || {};
    cocsData.locations[locationId] = true;
  }).then(function() {
    global.db.ref('cocs/' + cocsId).set(cocsData);
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
