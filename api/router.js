var router = require('express').Router();

router.use('/cocs', require('./routes/cocs'));
router.use('/questions', require('./routes/voice'));
router.use('/locations', require('./routes/locations'));
router.use('/programs', require('./routes/programs'));
router.use('/services', require('./routes/services'));
router.use('/clients', require('./routes/clients'));
router.use('/emails', require('./routes/emails'));

module.exports = router;
