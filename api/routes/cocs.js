var router = require('express').Router();
var faker = require('faker');
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('cocs').push().key;
  res.json(global.db.ref('cocs/' + newPostKey).set(req.body).key);
})
.patch(function(req, res) {
  var putArray = req.body;
  if (putArray) {
    var responseObj = putArray.reduce((obj, data) => {
      obj[data.key] = data;
      delete obj[data.key].key;
      return obj;
    }, {});
    res.json(global.db.ref('cocs').update(responseObj));
  } else {
    res.json();
  }
})
.get(function(req, res) {
  var keyList = req.query.keyList;
  var search = 'cocs/' + (req.query.key || '');
  global.db.ref(search).once('value').then(function(snapshot) {
    var dataSet = snapshot.val();
    if(keyList) {
      var arrayLength = keyList.length;
      var dataResponse = {};
      for (var i = 0; i < arrayLength; i++) {
        dataResponse[i] = dataSet[keyList[i]] || {};
      }
      res.json(dataResponse);
    } else {
      res.json(dataSet);
    }
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
  var cocsId = req.body.cocId;
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
    res.json(global.db.ref('cocs/' + cocsId).set(cocsData));
  });
})
;
// router.route('/random')
// .post(function(req, res) {
//   var count = 50;
//   for (var i = 2; i < count; i++) {
//     var newPost = {};
//     newPost.contactInfo = {};
//     newPost.contactInfo.street = faker.address.streetAddress();
//     newPost.contactInfo.city = faker.address.city();
//     newPost.contactInfo.zip = faker.address.zipCode();
//     newPost.contactInfo.state = faker.address.stateAbbr();
//     newPost.name = "COC Number " + i;
//     newPost.email = faker.internet.email();
//     newPost.phoneNumber = faker.phone.phoneNumber();
//     var newPostKey = global.db.ref().child('locations').push().key;
//     global.db.ref('cocs/' + newPostKey).set(newPost);
//   }
//   res.json();
// });
module.exports = router;
