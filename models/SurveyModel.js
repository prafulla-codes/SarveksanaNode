const mongoose = require('mongoose');
var Schema = mongoose.Schema;
const surveySchema = new Schema({
  title:{
      type:String
  },
  ipfs_path:{
      type:String
  },
  ipfs_hash:{
      type:String
  },
  ipfs_size:{
    type:String
  }
})

module.exports = new mongoose.model('Survey',surveySchema);