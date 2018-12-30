const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');


var data = {
    id: 4
};

var token = jwt.sign(data,'123abc');

var decoded = jwt.verify(token,'123abc');


console.log(token);
console.log('---------------');
console.log('decoded :  ', decoded);
// jwt.verify;
// var mes = 'i am user number 3';
// var hash = SHA256(mes).toString();

// console.log(`message is : ${mes}`);

// console.log(`hashed is : ${hash}`);



// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data)+'somesecret').toString(),
// }

// // token.data.id=5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();

// if(resultHash === token.hash){
//     console.log('Data was not changed');

// }else{
//     console.log('Data was Changed, do not trust');
// }


