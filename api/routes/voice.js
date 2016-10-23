var router = require('express').Router(),
voice = require('../twilio/voice');

router.post('/:index(\\d+)?', voice.question);
router.post('/finish', voice.finishUp);
router.get('/web', voice.listQuestions);

module.exports = router;
