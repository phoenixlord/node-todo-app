//const MongoClient=require('mongodb').MongoClient;
const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
        return console.log("Unable to connect to database server");
    }
    console.log('Connected to database server')
    
     
  /*  db.collection('Todos').insertOne({
        text:'Something to do',
        completed:false
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert To do',err)
        }
        
      console.log(JSON.stringify(result.ops,undefined,2))  
    }
    )*/
    
    
    
    
    db.collection('UserInfo').insertOne({
        name:'Yacham Joseph',
        age:37,
        location:"barnawa"
    },(err,result)=>{
        if(err){
            return console.log('Unable to insert To do',err)
        }
        
      console.log(JSON.stringify(result.ops,undefined,2))  
    }
    )
    
    db.close();
})