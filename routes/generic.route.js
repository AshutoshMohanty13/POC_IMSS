const express = require('express');
const router = new express.Router();
const axios = require('axios');
const GenericController = require('../controller/generic.controller');


router.post('/generic', new GenericController().create());

module.exports = router;

