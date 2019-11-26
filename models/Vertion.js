const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const languages = ['english','spanish'];

const vertionSchema = new Schema({
  language: {
    type: String,
    enum : languages,
    default: 'spanish'
  },
  title: {
    type: String,
    required: true
  },
  textBody: {
    type:String,
    required: true
  },
  audioReference: {
    type:String
  },
  update: {
    type: Date,
    default: Date.now
  }
  });


module.exports =  Vertion= mongoose.model('Vertion', vertionSchema);
