const express = require('express');
const bodyparser = require('body-parser');
const { ObjectID } = require('mongodb');
const _ = require('lodash');

var { mongoose } = require('./db/mongoose');
var {User}  = require('./models/user');
var {Todo}  = require('./models/todo');
var {authenticate} = require('./middleware/authenticate');
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
    Todo.find().then((todos)=>{
        res.send({
            todos,
        });
    },(e)=>{
        res.status(400).send(e);
    })
});

//GET/todos/12345
app.get('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send('Invalid ID');
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send('Todo not found');
        }
        return res.status(200).send(todo);
    },(e)=>{
        return res.status(400).send();
    })
})
//Update
app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body, ['text','completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false ;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{ $set: body },{ new: true })
    .then((todo) => { 
        if (!todo) { 
            return res.status(404).send('todo not found');
        }
        return res.status(200).send(todo);

    }, (e) => { 
        return res.status(404).send();
    })
});
//Delete
app.delete('/todos/:id', (req,res)=>{
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send('Invalid ID');
    }

    Todo.findByIdAndRemove(id).then((todo) => {
        if (!todo) {
            return res.status(404).send('Todo not found');
        }
        return res.status(200).send(todo);
    }, (e) => {
        return res.status(400).send();
    })

})

app.post('/users', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);

    var user = new User(body);

    user.save().then(() => {
       return user.generateAuthToken();
    }).then((token)=> {
        res.header('x-auth',token).send(user);
    }).catch((err) => {
        res.status(400).send(err);
    });

});


app.get('/users/me', authenticate, (req,res)=>{
   res.send(req.user);
})

app.listen(3000,()=>{

    console.log('started on port 3000');

});


module.exports ={
    app,
}