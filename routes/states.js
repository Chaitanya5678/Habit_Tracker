const express = require('express');

const router = express.Router();

const statesController = require('../controllers/statesController');

const passport = require('passport');

router.get('/toggle/:id', passport.checkAuthentication, statesController.toggle);

module.exports = router; 