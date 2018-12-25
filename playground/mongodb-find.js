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

    // db.collection('Todos').find({ 
    //     _id: new ObjectID('5c220abd5446bc5381480b0e')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('unable to fetch todos',err);
    // });


    // db.collection('User').find().count().then((count) => {
    //     console.log(`Todos count: ${count}`);
        
    // }, (err) => {
    //     console.log('unable to fetch todos', err);
    // });

    db.collection('User').find({name: 'Rabie'}).toArray().then((docs) => {
        console.log(`Todos`);
        console.log(JSON.stringify(docs,undefined,2));

    }, (err) => {
        console.log('unable to fetch todos', err);
    });

    // client.close();
});