const express = require('express');
router = express.Router();
const userControllers = require('./../../controllers/users')



router.post('/',userControllers.validate, userControllers.postUser)
module.exports = router;