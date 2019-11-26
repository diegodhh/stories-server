
const User = require('./../models/User')

module.exports = async function(req, res, next) {
    //get token from header
    try {
    const cookies = req.cookies;
    // check if not token
    const token = cookies['x-auth-token'];
    if (!token) {
  
        return res.status(401)
      
        .cookie('login', 'false', { expires: new Date(Date.now() + 900000), httpOnly: false })
        .json({msg: 'No token, authorization denied'});
    }
    // verify token
         req.user = await User.decodeToken(token)
         res.cookie('login', 'true', { expires: new Date(Date.now() + 900000), httpOnly: false })
   
        next();
    } catch(err) {
        res.clearCookie('x-auth-token');
        res.cookie('login', 'false', { expires: new Date(Date.now() + 900000), httpOnly: false })
        res.status(401).json({ msg:'token is not valid'});
    }

}