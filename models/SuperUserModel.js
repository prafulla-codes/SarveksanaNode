const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const superUserSchema = new Schema({
  userID:{
      type:String
  },
  password:{
      type:String
  }

})

module.exports = new mongoose.model('Superuser',superUserSchema);