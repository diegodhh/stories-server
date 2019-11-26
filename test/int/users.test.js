const request = require('supertest');
const utils = require('../utils/index');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('./../../models/User');
const bcrypt = require('bcryptjs');

describe('users route', ()=>{
    let app;
    const defaultUser = ()=> {
        let user = JSON.parse(JSON.stringify({email: 'test@gmail.com', password: 'secreta1234', name: 'testname'}))
        return user;
    }
    beforeAll(async ()=>{
            
            app = await require('../../index');
        })
        beforeEach(async ()=>{
            await User.remove({})
            
        })    
        afterAll(()=>{
            app=null;
        })
    
    it('should return toke with codifie user with out password and set it to cookies', async ()=>{
        const user = defaultUser();
        let res = await request(app)
        .post('/api/users').send(user);
        const cookie = utils.extractCookies(res,'X-Auth-Token' );
        const decoded = jwt.verify(cookie['X-Auth-Token'], config.get("jwtSecret"));
       
        const userFromToken= await User.getUserFromToken(cookie['X-Auth-Token']) 
        const {id, name} = userFromToken;
        expect(decoded).toMatchObject(expect.objectContaining({id:id,name}))
     
    })
    it('should return toke with codifie user with out password and set it to cookies', async ()=>{
        const user = defaultUser();
        let res = await request(app)
        .post('/api/users').send(user);
     
        expect(res.status).toBe(200)
        
    })

    it('should return error cause is no email', async ()=>{
        const user = {...defaultUser(), email: 'invalid', password: 'secreta1234'};
        let res = await request(app)
        .post('/api/users').set('Content-Type', 'application/json').send(user);
     
        expect(res.status).toBe(422)
        expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('email'), msg: expect.stringMatching('valid')})]))
    })
    it('should return error cause is password to short', async ()=>{
        const user = {...defaultUser(), password: 'secr'};
        let res = await request(app)
        .post('/api/users').set('Content-Type', 'application/json').send(user);
     
        expect(res.status).toBe(422)
        expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('password'), msg: expect.stringMatching('nvalid')})]))
    })
    it('should return save user in database', async ()=>{
        const user = defaultUser();
        let res = await request(app)
        .post('/api/users').set('Content-Type', 'application/json').send(user);
     
        expect(res.status).toBe(200)
        const newUser = await User.findOne({email: 'test@gmail.com'})
        expect(newUser).toBeDefined();
    })
    
    it('should not allow to let the user to duplicate a mail', async ()=>{
       
        const user = defaultUser();
       
        let res = await request(app)
        .post('/api/users').set('Content-Type', 'application/json').send(user);
     
        expect(res.status).toBe(200)
        const saveUser = await User.findOne({email:'test@gmail.com'});
        expect(bcrypt.compareSync(user.password, saveUser.password)).toBe(true);
    
    })
  
    it('should return valid token in cookie', async ()=>{
        const user = defaultUser();
        let res = await request(app)
        .post('/api/users').set('Content-Type', 'application/json').send(user);
     
        const cookie = utils.extractCookies(res,'X-Auth-Token' );
        const token = cookie['X-Auth-Token'];
        expect(token).toBeDefined();
        const {id, name} = await User.getUserFromToken(token);
        const decoded = await jwt.decode(token, config.get('jwtSecret'));
        expect(decoded).toMatchObject({id,name})  
    })


    
}) 