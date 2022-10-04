const express = require('express');
const router = express.Router();

const trafficCtrl = require('./trafficController');

router.post('', trafficCtrl.saveData);

module.exports = router;