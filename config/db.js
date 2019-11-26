const config = require('config');
const mongoose = require('mongoose');
const db = config.get('mongoURL');

connectDb = async ()=>{
    try {
        await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log(`mongodb connected in${db}`)
    } 
    
    catch(err){
        console.log(err)
        process.exit()
    }
   
}

module.exports = connectDb;
