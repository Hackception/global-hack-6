var router = require('express').Router();
router.route('/')
.post(function(req, res) {
  var newPostKey = req.body.key || global.db.ref().child('services').push().key;
  res.json(global.db.ref('services/' + newPostKey).set(req.body).key);
})
.patch(function(req, res) {
  var putArray = req.body;
  if (putArray) {
    var responseObj = putArray.reduce((obj, data) => {
      obj[data.key] = data;
      delete obj[data.key].key;
      return obj;
    }, {});
    res.json(global.db.ref('services').update(responseObj));
  } else {
    res.json();
  }
})
.get(function(req, res) {
  var keyList = req.query.keyList;
  var search = 'services/' + (req.query.key || '');
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
module.exports = router;
