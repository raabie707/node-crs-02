const {ObjectID} = require('mongodb');
const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

Todo.remove({}); //removes all todos

// both of these returns the document
// Todo.findOneAndRemove  takes query obj
// Todo.findByIdAndRemove  takes only id 

Todo.findByIdAndRemove('5c28868d7b87a462f477b00f').then((todo)=>{
    console.log(todo);
});