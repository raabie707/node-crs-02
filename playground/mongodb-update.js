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

    db.collection('User').findOneAndUpdate({ 
        _id: new ObjectID("5c2207d8dc40db2ae823f714")
    },{
        $set : {
            name : 'Rabie',
        },

        $inc: { 
            age : 1 ,
        }
    },{
        returnOriginal : false 
    }
    ).then((result)=>{
        console.log(result);
    });

    
    // client.close();
});