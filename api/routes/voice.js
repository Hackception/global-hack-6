var router = require('express').Router(),
questionPath = require('../constants/question-path'),
voice = require('../twilio/voice');

router.post('/:index?', voice.question);
router.route('/web')
.get(function(req, res) {
  res.json(questionPath);
});


module.exports = router;
