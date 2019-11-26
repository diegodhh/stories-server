request = require('supertest');
const User = require('./../../models/User');

const defaultUser = ()=> {
    let user = JSON.parse(JSON.stringify({email: 'test@gmail.com', password: 'secreta1234', name: 'testname'}))
    return user;
}

describe('auth route ' , ()=>{
    let app;
    beforeAll(async()=>{
        app = await require('./../../index');

    })
    beforeEach(async()=>{
        await User.remove({})
    })
    afterAll(()=>{
        app = null;
    })
  


    describe('express-validation before moongose', ()=>{
        it('should return validation error if mail is invalid', async ()=>{
            const user = {...defaultUser(), email: 'asdasd'};
            let res = await request(app)
            .post('/api/auth').set('Content-Type', 'application/json').send(user);
            expect(res.status).toBe(422);
            expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('email'), msg: expect.stringMatching('valid')})]))
        })
        it('should return validation password invalid if mail is invalid', async ()=>{
            const user = {...defaultUser(), password: 'afss'};
            let res = await request(app)
            .post('/api/auth').set('Content-Type', 'application/json').send(user);
            expect(res.status).toBe(422);
            expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('password'), msg: expect.stringMatching('nvalid')})]))
        })
    })
    describe('moongose involves', ()=>{
        it ('user should get 200 respond if user exists and password ok', async ()=>{
            let user = defaultUser();
            let signInRes = await request(app).post('/api/users').set('Content-Type', 'application/json').send(user);
            
            expect(signInRes.status).toBe(200);
            
           
            let res = await request(app).post('/api/auth').set('Content-Type', 'application/json').send(user);
            expect(res.status).toBe(200);
        })
        it ('user should get 400 respond if mail doesn exists', async ()=>{
            let user = {...defaultUser(), email: 'wrongemail@gmail.com'};
            let res = await request(app).post('/api/auth').set('Content-Type', 'application/json').send(user);
            expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('mail'), msg: expect.stringMatching('exist')})]))
            expect(res.status).toBe(400);
        })
        it ('user should get 401 with wrong password', async ()=>{
        
            let user = defaultUser();
            let signInRes = await request(app).post('/api/users').set('Content-Type', 'application/json').send(user);
            
            expect(signInRes.status).toBe(200);
            
            let falseUser = {...defaultUser(), password: 'wrongPassword'};
            let res = await request(app).post('/api/auth').set('Content-Type', 'application/json').send(falseUser);
            expect(res.body.errors).toMatchObject(expect.arrayContaining([expect.objectContaining({param: expect.stringMatching('password'), msg: expect.stringMatching('password')})]))
            expect(res.status).toBe(401);
        })
      
        

       
    })
    
})