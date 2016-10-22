var router = require('express').Router();

router.use('/cocs', require('./routes/cocs'));
router.use('/questions', require('./routes/voice'));
module.exports = router;
