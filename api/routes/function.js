const express = require('express');
const router = express.Router(); 
const duration = require('../controller/DurationController');
const consult = require('../controller/TypeConsultationController');


router.post('/duration', duration.registerDuration);
router.get('/duration', duration.getDuration);

router.post('/consultation', consult.registerConsult);
router.get('/consultation', consult.getConsult);

module.exports = router;
