const express = require('express');
router = express.Router();
const tokenAuth = require('./../../middleware/token-auths')

// router.get('/', authControllers.getAuth)

router.get('/',tokenAuth, (req, res)=>{
    res.status(200).json(req.user)
})
module.exports = router;