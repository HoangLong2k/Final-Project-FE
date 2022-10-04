const express = require('express');
const router = express.Router();

const adminCtrl = require('./adminController');

router.get('', adminCtrl.getData);

module.exports = router;