const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const adminSchema = new Schema({
  userID:{
      type:String
  },
  password:{
      type:String
  },
  department:{
      type:String
  },
  address:{
      type:String
  },
  private_key:{
      type:String
  }

})

module.exports = new mongoose.model('Admin',adminSchema);