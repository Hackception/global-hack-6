var router = require('express').Router(),
questionPath = require('../constants/question-path'),
voice = require('../twilio/voice');

router.post('/:index?', voice.question);
router.route('/web')
.get(function(req, res) {
  res.json(questionPath);
})
.post(function(req, res) {
  var intake = req.body;
  var newPostKey = global.db.ref().child('intake').push().key;
  res.json(global.db.ref('intake/' + newPostKey).set(intake).key);
})
;


module.exports = router;
