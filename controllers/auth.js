const {check, validationResult} = require('express-validator');
const formatErrors = require('./utils/FormatErrors');
const User = require('./../models/User');
const bcrypt = require('bcryptjs');

exports.postAuth = async (req, res)=> {
    try{
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
            formatErrors.trhowValidationError(validationErrors.array())
        }
        const loggingUser = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await User.findOne({email: loggingUser.email})
        
        if (!user) {
        // user doesnt exists
            formatErrors.trhowBadRequest([{msg: 'email doesnt exists', param: 'email'}])
        }
        let isValidPass = await bcrypt.compare(loggingUser.password, user.password)
        if (isValidPass) {
            const token = await user.getToken()
            res.cookie('login', token, { expires: new Date(Date.now() + 900000), httpOnly: false })
            res.cookie('login', 'true', { expires: new Date(Date.now() + 900000), httpOnly: false })
            res.status(200).send('ok');
        } else {
            formatErrors.trhowForbidden([{msg: 'bad password', param: 'password'}])
        };
       
    } catch(err) {
        formatErrors.handleErrorRespond(err, res)
    }
   
}


exports.validate = [check('email', "please include a valid email").isEmail(),
check('password','password invalid, must have at least 6 caracters').isLength({min:6})]
