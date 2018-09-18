const expect=require('expect')
const request=require('supertest')
const {ObjectID}=require('mongodb')

const {app}=require('./../server')
const {Todo}=require('./../models/todo')

const todos=[{
    text:"First todo",
    _id:new ObjectID()
},
 {
     text:"Second todo",
     _id:new ObjectID()
 }]

beforeEach((done)=>{
    Todo.remove({}).then(()=>{
        
       return Todo.insertMany(todos)
        
    }).then(()=>done())
    
})

describe('POST /todos',()=>{
    it('Should create a new todo',(done)=>{
        var text='test todo text'
        
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err)
            }
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1)
                expect(todos[0].text).toBe(text)
                done();
                
            }).catch((e)=>done(e))
        })
    })
    
    
})

describe('GET/todos',()=>{
    
    it("Should get all Todos",(done)=>{
        
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2)
        })
        .end(done)
    })
    
})


describe('GET/todos:id',()=>{
    it("Should get todo with specific id",(done)=>{
        
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text)
            
        })
        .end(done)
    })
    
    it("Should return a 404 status for object not found",(done)=>{
        var hexId=new ObjectID().toHexString()
        
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done)
        
    })
    
    it("Should return a 404  for non valid id",(done)=>{
        
        request(app)
        .get('/todos/123swe')
        .expect(404)
        .end(done)
        
    })
    
})






