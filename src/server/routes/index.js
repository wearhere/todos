const express = require('express');

const router = express.Router();

router.use('/api', require('./api'));
router.get('/', require('./views'));

module.exports = router;
