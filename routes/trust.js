const express = require('express');
const router = express.Router();
const Trust = require('../src/Services/Trust')
const auth = require('./Common/auth')

router.post('/', auth, function(req, res, next) {
  Trust.sendTrust(req,res);
});

router.get('/', auth, function(req, res, next) {
  Trust.readTrust(req,res);
});

module.exports = router;
