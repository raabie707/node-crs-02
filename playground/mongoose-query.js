const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5c28864f7b87a462f477b00e11';
var id = '5c254d246097fa4fb04e7001';
// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }
// Todo.find({
//     _id: id,
// }).then((todos)=>{
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id,
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log("id not found");
//     }
//     console.log('TodoByID', todo);
// }).catch((e)=>console.log(e));
 User.findById(id).then((user)=>{console.log(user)}).catch((e)=>console.log(e));