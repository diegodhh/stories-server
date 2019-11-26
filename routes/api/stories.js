const express = require('express');
const authToken = require('./../../middleware/token-auths');
router = express.Router();
const storiesControllers = require('./../../controllers/stories')



router.post('/',authToken, storiesControllers.validate, storiesControllers.postStorie)
module.exports = router;