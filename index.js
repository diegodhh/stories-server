const express = require('express')
var cookieParser = require('cookie-parser')
 


const app = express()
const connectDb = require('./config/db')
const waitMongo = connectDb();
const port = process.env.PORT || 5000
app.use(cookieParser())
app.use(express.json({extended: false}));
// routers
app.use('/api/test', require('./routes/api/test-token-auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/stories', require('./routes/api/stories'));
app.get('/', (req, res) => res.send('Hello World!'))

if (process.env.NODE_ENV !=='test') {
    //console.log(process.env.NODE_ENV)
    app.listen(port, ()=>{console.log(`listening in port ${port}`)})

  }

  const appPromise = new Promise((resolve, reject)=>{
    waitMongo.then(()=>{
      resolve(app)
    }) 
  })
  module.exports = appPromise;
