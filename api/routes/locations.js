var router = require('express').Router();
var faker = require('faker');
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('locations').push().key;
  res.json(global.db.ref('locations/' + newPostKey).set(req.body).key);
})
.patch(function(req, res) {
  var putArray = req.body;
  if (putArray) {
    var responseObj = putArray.reduce((obj, data) => {
      obj[data.key] = data;
      delete obj[data.key].key;
      return obj;
    }, {});
    res.json(global.db.ref('locations').update(responseObj));
  } else {
    res.json();
  }
})
.get(function(req, res) {
  var keyList = req.query.keyList;
  var search = 'locations/' + (req.query.key || '');
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
    res.json(global.db.ref('locations/' + locationId).set(locationData).key);
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
// router.route('/random')
// .post(function(req, res) {
//   var count = 1000;
//   for (var i = 0; i < count; i++) {
//     var newPost = {};
//     newPost.contactInfo = {};
//     newPost.contactInfo.street = faker.address.streetAddress();
//     newPost.contactInfo.city = faker.address.city();
//     newPost.contactInfo.zip = faker.address.zipCode();
//     newPost.contactInfo.state = faker.address.stateAbbr();
//     newPost.name = faker.company.companyName();
//     newPost.email = faker.internet.email();
//     newPost.phoneNumber = faker.phone.phoneNumber();
//     var newPostKey = global.db.ref().child('locations').push().key;
//     global.db.ref('locations/' + newPostKey).set(newPost);
//   }
//   res.json();
// });
// router.route('/random-service')
// .post(function(req, res) {
//   global.db.ref('locations').once('value').then(function(snapshot) {
//     var dataSet = snapshot.val();
//     var dataList = Object.keys(dataSet);
//     var dataLength = dataList.length;
//     var servicesArray = [
//       {"-KUis8Cl0AJXwFI9TN8b" : "true"},
//       {"-KUisJJOTiFzepBZ8bxV" : "true"},
//       {"-KUisU3O8KNnMzNeY_oo" : "true"},
//       {"-KUisYw5x1KpIx3sLDgB" : "true"}
//     ];
//     for (var i = 0; i < dataLength; i++) {
//       var key = dataList[i];
//       console.log(key);
//       var min = Math.ceil(0);
//       var max = Math.floor(4);
//       var serviceNum = Math.floor(Math.random() * (max - min)) + min;
//       console.log(serviceNum);
//       console.log(servicesArray[serviceNum]);
//       dataSet[key].services = servicesArray[serviceNum];
//       global.db.ref('locations/' + key).set(dataSet[key]);
//     }
//     res.json();
//   })
// });
router.route('/search-by-service')
.get(function(req, res) {
  global.db.ref('locations').once('value').then(function(snapshot) {
    var dataSet = snapshot.val();
    var dataList = Object.keys(dataSet);
    var dataLength = dataList.length;
    var servicesKey = req.query.serviceId;
    // var servicesKey = "-KUis8Cl0AJXwFI9TN8b";
    var resultList = [];
    for (var i = 0; i < dataLength; i++) {
      var key = dataList[i];
      var obj = dataSet[key];
      var serviceObj = obj.services;
      if(serviceObj[servicesKey]) {
        resultList.push(dataSet[key]);
      }
    }
    res.json(resultList);
  })
});
module.exports = router;
