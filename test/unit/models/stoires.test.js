const connectDb= require('./../../../config/db');
const Storie = require('./../../../models/Storie');
const User = require('./../../../models/User');
describe('model stories', ()=>{
    let user;
    beforeAll(async()=>{
        await  User.remove({})
        await connectDb();
        user = new User({name: 'test', email: 'test@gmail.com', password: 'password'})
        await user.save();
    })
    afterAll(async()=>{
        await  User.remove({})
    })
    beforeEach(async()=>{
       await  Storie.remove({})
    })
    it('should create a new vertion of existing storie', async ()=>{
        new Storie({user: user.id})
    })
})