const express = require('express');
const { login, logout } = require('../controllers/auttController');
const validaToken = require('../middlewares/validaToken.js');

const router = express.Router();

router.post('/auth', login);
router.post('/auth/logout', validaToken, logout);

module.exports = router;