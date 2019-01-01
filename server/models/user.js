const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlentgh: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
        }

    },

    password: {
        type: String,
        required: true,
        minlentgh: 6,
        trim: true,
    },

    tokens: [{
        access: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        }
    }],

});
//overriding a function to only return user id and email
UserSchema.methods.toJSON= function(){
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj,['_id','email']);
}

//this functiontion generates Authentication Tokens to keep users logged in
UserSchema.methods.generateAuthToken = function (){

    var user = this;
    var access = 'auth';
    var token = jwt.sign( { _id : user._id.toHexString() , access },'abc123').toString();

    user.tokens.push({
        access,
        token,
    });

    return user.save().then(()=>{
        return token;
    });
};

//this functiontion finds a user by its token

UserSchema.statics.findByToken = function (token) {
    
    var User = this;
    var decoded ;

    try{
        decoded = jwt.verify(token,'abc123');

    }catch(e){
        return Promise.reject();
    }

    return User.findOne({
       '_id': decoded._id,
        'tokens.token':token,
        'tokens.access': 'auth',
    });
}
//this function find user by email and then validates their password 
UserSchema.statics.findByCredintials = function(email,password){
    
    var User = this;

    return User.findOne({email}).then((user)=>{
        if(!user){
            return Promise.reject();
        }

        return new Promise((resolve, reject)=>{
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                   resolve(user);
                } else {
                   reject();
                }
            });
        });
    });
}

//this function hashes a user's password before saving it 
UserSchema.pre('save', function (next) {
    var user = this;

    if(user.isModified('password')){

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
               user.password = hash;
               next();
            })
        });

    }else{
    next();}
});

//this function removes a users token to log them out
UserSchema.methods.removeToken = function(token){
    var user = this;

    return user.update({
        $pull :{
            tokens :{token}
        }
    });
};
//creating a mongoose user model
var User = mongoose.model('User', UserSchema);

//exporting modules
module.exports = {
    User,
};