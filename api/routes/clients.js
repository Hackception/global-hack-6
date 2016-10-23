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
router.route('/wait-list')
.get(function(req, res) {
  global.db.ref('intake/').once('value').then(function(snapshot) {
    var intakes = snapshot.val();
    var responseList = [];
    if(intakes){
      var intakesKeyList = Object.keys(intakes);
      var dataLength = intakesKeyList.length;
      for (var i = 0; i < dataLength; i++) {
        var key = intakesKeyList[i];
        var keyData = intakes[key];
        responseObj = {};
        responseObj.firstName = keyData.responses.firstName.answer;
        responseObj.lastName = keyData.responses.lastName.answer;
        responseObj.phoneNumber = keyData.phone;
        responseObj.onStreets = keyData.responses.onStreets.answer;
        responseList.push(responseObj);
      }
    }
    res.json(responseList);
  })
})
module.exports = router;
