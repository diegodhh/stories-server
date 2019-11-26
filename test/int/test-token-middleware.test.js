request = require('supertest');
const {extractCookies} = require('./../utils/index')
const User = require('./../../models/User');

describe('test auth middleware', ()=>{
    let app;
    beforeAll(async()=>{
            app = await require('../../index');
        
        })
        beforeEach(async()=>{
            await User.remove({})
        })
        afterAll(()=>{
            app=null;
        })
    it('should respond with forbiden without sending cookies', async ()=>{
        let res = await request(app).get('/api/test')
        let cookie = extractCookies(res, 'login') 
        expect(cookie).toBeDefined()
        expect(res.status).toBe(401);
        expect(cookie.login).toBe('false');
    })
    it('should respond with forbiden without invalid token', async ()=>{
        let res = await request(app).get('/api/test').set('Cookie', ['x-auth-token=falsetoken','login=true']);
        let cookie = extractCookies(res, 'login') 
        expect(extractCookies(res, 'x-auth-token')).toStrictEqual( {"x-auth-token": ""}); 
        expect(cookie).toBeDefined()
        expect(res.status).toBe(401);
        expect(cookie.login).toBe('false');
   
    })
    it('should respond with 200 and the user', async ()=>{
        let user = new User({name: 'test', mail: 'test@testmail.com', password: 'testpassword'}) 
        await user.save();
        const token = await user.getToken()
        let res = await request(app).get('/api/test').set('Cookie', [`x-auth-token=${token}`,'login=true']);
        let cookie = extractCookies(res, 'login') 
        const {id, name} = await User.getUserFromToken(token);
        
        expect(res.body).toMatchObject(expect.objectContaining({id}));
        expect(res.status).toBe(200); 
        expect(cookie['login']).toBe('true'); 
   
    })
})