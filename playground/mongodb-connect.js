// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //destructuring

MongoClient.connect('mongodb://localhost:27017',(err, client)=>{


    if(err){
        return console.log("unable to connect to MongoDB server");
    }else
    {
        console.log("Connected to MongoDB server");
    }

    var db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something To Do',
    //     completed: false,
    // },(err,result)=>{

    //     if(err){return console.log('Unable to insert todo',err);}

    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('User').insertOne({

    //     name : 'Rabie',
    //     age: 21,
    //     location : 'somewhere on earth',
    // },
    // (err,result)=>{
    //     if (err) { return console.log('Unable to insert todo', err); }

    //     console.log(result.ops[0]._id.getTimestamp());
    // })

    client.close();
});