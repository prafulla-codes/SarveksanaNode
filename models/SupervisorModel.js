const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const supervisorSchema = new Schema({
  userID:{
      type:String
  },
  password:{
      type:String
  },
  address:{
      type:String
  },
  private_key:{
      type:String
  }

})

module.exports = new mongoose.model('Supervisor',supervisorSchema);