const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const config = require('config')

const userSchema = new Schema({
  name: {type: String, required: true},
  email:  {type: String, unique: true },
  password: String,
  date: { type: Date, default: Date.now }
});


userSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    const mongoError = new Error('There was a duplicate key error')
    mongoError.status = 407;
    mongoError.data = [{msg: 'Invalid,alrready exists', param: 'email'}]
    next(mongoError);
  } else {
    next();
  }
});

userSchema.methods.getToken = async function() {
  const userInfo= {id: this.id, name: this.name};
  const token =  await jwt.sign(userInfo, config.get("jwtSecret")); 
  return token
}
userSchema.statics.getUserFromToken = async function (token) {
    const decoded = await jwt.verify(token, config.get("jwtSecret"));
    let user = await this.model('User').findOne({_id:decoded.id});
    return user;
}
userSchema.statics.decodeToken = async function (token) {
  const decoded = await jwt.verify(token, config.get("jwtSecret"));
  
  return decoded;
}


module.exports = User = mongoose.model('User', userSchema);