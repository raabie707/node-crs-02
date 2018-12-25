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

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('User').deleteMany({ name: 'Rabie' }).then((result) => {
    //     console.log(result);
    // });


    //deleteOne
    // db.collection('Todos').deleteOne({ text: 'eat' }).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({ completed: false }).then((result) => {
    //     console.log(result);
    // });

    // db.collection('User').findOneAndDelete({ _id: new ObjectID('5c2206af77665329b8da8c18') }).then((result) => {
    //     console.log(result);
    // });

    // 5c2206af77665329b8da8c18

    // client.close();
});