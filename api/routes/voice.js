var router = require('express').Router(),
voice = require('../services/voice');
weight = require('../services/weights');
router.post('/:index(\\d+)?', voice.question);
router.post('/finish', voice.finishUp);
router.get('/web', voice.listQuestions);
router.route('/web')
.post(function(req, res) {
  var intake = req.body;
  var newPostKey = global.db.ref().child('intake').push().key;
  global.db.ref('intake/' + newPostKey).set(intake);
  weight.calculateWeight(newPostKey);
})
;

module.exports = router;
