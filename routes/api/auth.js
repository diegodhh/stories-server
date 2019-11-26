const express = require('express');
router = express.Router();
const authControllers = require('./../../controllers/auth')



router.post('/',authControllers.validate, authControllers.postAuth)
module.exports = router;