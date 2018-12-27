var express = require('express');
var bodyparser = require('body-parser');


var { mongoose } = require('./db/mongoose');
var {User}  = require('./models/user');
var {Todo}  = require('./models/todo');

var app = express();

app.use(bodyparser.json());

//Create 
app.post('/todos',(req,res)=>{

    var todo = new Todo({
        text : req.body.text,
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });

});

//Read
app.get('/todos', (req, res) => {

});
//Update

//Delete















app.listen(3000,()=>{

    console.log('started on port 3000');

})