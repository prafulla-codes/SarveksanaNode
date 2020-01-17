const mongoose = require('mongoose');
let Survey = require('../models/SurveyModel');

function createSurvey(title,ipfs_path,ipfs_hash,ipfs_size,res){

    let s = new Survey();
    s.title = title;
    s.ipfs_path = ipfs_path;
    s.ipfs_hash = ipfs_hash;
    s.ipfs_size = ipfs_size;

    s.save()
    res.json({is_successful:true})
}

module.exports = createSurvey;