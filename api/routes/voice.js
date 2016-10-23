var router = require('express').Router(),
voice = require('../services/voice');

router.post('/:index(\\d+)?', voice.question);
router.post('/finish', voice.finishUp);
router.get('/web', voice.listQuestions);
router.route('/web')
.post(function(req, res) {
  var intake = req.body;
  var newPostKey = global.db.ref().child('intake').push().key;
  res.json(global.db.ref('intake/' + newPostKey).set(intake).key);
})
;

module.exports = router;
