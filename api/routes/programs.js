var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('programs').push().key;
  res.json(global.db.ref('programs/' + newPostKey).set(req.body).key);
})
.get(function(req, res) {
  var search = 'programs/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
;
router.route('/services')
.get(function(req, res) {
  var programId = req.query.programId;
  global.db.ref('programs/' + programId + '/services/').once('value').then(function(snapshot) {
    res.json(snapshot.val());
  });
})
.post(function(req, res) {
  var programId = req.body.programId;
  var serviceId = req.body.serviceId;
  var programData;
  var serviceData;
  global.db.ref('services/' + serviceId).once('value').then(function(snapshot) {
    serviceData = snapshot.val();
    serviceData.programs = serviceData.programs || {};
    serviceData.programs[programId] = true;
  }).then(function() {
    global.db.ref('services/' + serviceId).set(serviceData);
  });
  global.db.ref('programs/' + programId).once('value').then(function(snapshot) {
    programData = snapshot.val();
    programData.services = programData.services || {};
    programData.services[serviceId] = true;
  }).then(function() {
    global.db.ref('programs/' + programId).set(programData);
  });
})
;
module.exports = router;
