const express = require('express');
const router = express.Router();
const Login = require('../src/Services/Login')

router.post('/', function(req, res, next) {
  Login.getToken(req, res);
});
/*
router.get('/', function(req, res, next) {
  Register.confirmRegister(req, res);
});*/
module.exports = router;
