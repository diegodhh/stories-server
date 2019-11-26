const request= require('supertest');

describe('server working', ()=>{
    let app;
    beforeAll(async()=>{
            app = await require('../../index');
        })
        afterAll(()=>{
            app=null;
        })
    
    it('should respond request hello word', async ()=>{
        let res = await request(app)
        .get('/')
        
        expect(res.text).toBe('Hello World!');

    })



    
}) 
