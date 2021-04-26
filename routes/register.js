const express = require('express');
const router = express.Router();
const Register = require('../src/Services/Register')

router.post('/', function(req, res, next) {
  Register.createRegister(req, res);
});
router.get('/', function(req, res, next) {
  Register.confirmRegister(req, res);
});

module.exports = router;
