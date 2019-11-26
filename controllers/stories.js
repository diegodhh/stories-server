const { check, validationResult } = require('express-validator');
exports.postStorie = async(req,res)=>{
    res.send('ok')
}

exports.validate = [check('name', 'Name is required').not().isEmpty(),
check('email', "please include a valid email").isEmail(),
check('password','password invalid, must have at least 6 caracters').isLength({min:6})]