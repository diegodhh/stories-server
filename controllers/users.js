
const config = require('config');
const User = require('./../models/User')
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const formatErrors = require('./utils/FormatErrors')


exports.postUser = async (req, res)=>{
    try {
        const validationErrors = validationResult(req)
        if (!validationErrors.isEmpty()) {
        formatErrors.trhowValidationError(validationErrors.array())
      }
      const userInfo ={
          email: req.body.email,
          password: req.body.password,
          name: req.body.name
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(userInfo.password,salt)
      userInfo.password=hash;
      const user = new User(userInfo)
      await user.save()
   

    
    const token =  await user.getToken();
    res.cookie('X-Auth-Token', token,{ expires: new Date(Date.now() + 900000), httpOnly: true })
    .json(user);
    } catch(err) {
        formatErrors.handleErrorRespond(err, res)
        
    }
    
}


exports.validate = [check('name', 'Name is required').not().isEmpty(),
check('email', "please include a valid email").isEmail(),
check('password','password invalid, must have at least 6 caracters').isLength({min:6})]