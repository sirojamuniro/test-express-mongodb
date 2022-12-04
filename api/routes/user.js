const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.validation.middleware');    
const user = require('../controller/UserController');
const schedule = require('../controller/ScheduleController');
const duration = require('../controller/DurationController');
const consult = require('../controller/TypeConsultationController');

router.post('/register', user.register);
router.post('/login', user.login);

router.post('/register-schedule', auth.auth,schedule.registerSchedule);
router.get('/schedule', auth.auth,schedule.getMySchedule);


module.exports = router;
