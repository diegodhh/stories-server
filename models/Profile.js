const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    data: {
        type: String,
    },
    date: {
      type: Date,
      default: Date.now
  }
});

module.exports = Profile = mongoose.model('User', profileSchema);

