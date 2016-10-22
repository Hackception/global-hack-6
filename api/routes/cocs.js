var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('cocs').push().key;
  res.json(global.db.ref('cocs/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  var search = 'cocs/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
router.route('/locations')
.get(function(req, res) {
  var cocsId = req.query.cocsId;
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
module.exports = router;
