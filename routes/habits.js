const express = require('express');

const router = express.Router();

const habitsController = require('../controllers/habitsController');

const passport = require('passport');

router.post('/create', passport.checkAuthentication, habitsController.create);
router.get('/destroy/:id', passport.checkAuthentication, habitsController.destroy);

module.exports = router; 