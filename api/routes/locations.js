var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('locations').push().key;
  res.json(global.db.ref('locations/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  var keyList = req.query.keyList;
  var search = 'locations/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    if(keyList) {
      var arrayLength = myStringArray.length;
      for (var i = 0; i < arrayLength; i++) {
        var dataSet = snapshot.val();
        if(dataSet[keyList[i]]) {

        }
      }
    }
    res.json(snapshot.val());
  });
})
;
router.route('/programs')
.get(function(req, res) {
  var locationId = req.query.locationId;
  global.db.ref('locations/' + locationId + '/programs/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
.post(function(req, res) {
  var locationId = req.body.locationId;
  var programId = req.body.programId;
  var locationData;
  var programData;
  global.db.ref('programs/' + programId).once('value').then(function(snapshot) {
    programData = snapshot.val();
    programData.locations = programData.locations || {};
    programData.locations[locationId] = true;
  }).then(function() {
    global.db.ref('programs/' + programId).set(programData);
  });
  global.db.ref('locations/' + locationId).once('value').then(function(snapshot) {
    locationData = snapshot.val();
    locationData.programs = locationData.programs || {};
    locationData.programs[programId] = true;
  }).then(function() {
    global.db.ref('locations/' + locationId).set(locationData);
  });
})
;
router.route('/services')
.get(function(req, res) {
  var locationId = req.query.locationId;
  global.db.ref('locations/' + locationId + '/services/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
.post(function(req, res) {
  var locationId = req.body.locationId;
  var serviceId = req.body.serviceId;
  var locationData;
  var serviceData;
  global.db.ref('services/' + serviceId).once('value').then(function(snapshot) {
    serviceData = snapshot.val();
    serviceData.locations = serviceData.locations || {};
    serviceData.locations[locationId] = true;
  }).then(function() {
    global.db.ref('services/' + serviceId).set(serviceData);
  });
  global.db.ref('locations/' + locationId).once('value').then(function(snapshot) {
    locationData = snapshot.val();
    locationData.services = locationData.services || {};
    locationData.services[serviceId] = true;
  }).then(function() {
    global.db.ref('locations/' + locationId).set(locationData);
  });
})
;
module.exports = router;
