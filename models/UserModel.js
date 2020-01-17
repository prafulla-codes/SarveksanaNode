const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const userSchema = new Schema({
    userID:{
        type:String,
    },
    firstName:{
        type:String,
    },
    lastName:{
        type:String,

    },
    emailId:{
        type:String,
    },
    contactNumber:{
        type:Number,

    },
    address:{
        type:String,
    },
    private_key:{
        type:String,
    },
    password:{
        type:String,
    },
    department:{
        type:String,
    }

})

module.exports = new mongoose.model('User',userSchema);