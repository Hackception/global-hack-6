var router = require('express').Router(),
voice = require('../twilio/voice');

router.post('/:index?', voice.question);

module.exports = router;
