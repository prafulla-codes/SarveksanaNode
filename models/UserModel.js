const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = new Schema({
    userID:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    department:{
        type:String
    }
})

module.exports = new mongoose.model('User',userSchema);