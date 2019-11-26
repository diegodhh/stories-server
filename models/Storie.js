const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Vertion = require('./Vertion');







const storieSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Üser'
  },
  vertions: {
    type: [Vertion.Schema],
    default: []
  }, 
  creationDate: {
    type: Date,
    default: Date.now
  },
  OrginalVertion: {
    type: mongoose.Schema.Types.ObjectId
    //ref: 'Vertion' 
  }
  });


storieSchema.methods.addNewVertion = async function(obj) {
  const vertion = new Vertion(obj)
  this.vertions.push(vertion);
  if (this.vertions.length === 1) {
    this.OrginalVertion = vertion; 
  }
  await this.save()

}




module.exports = Storie = mongoose.model('Stories', storieSchema);
