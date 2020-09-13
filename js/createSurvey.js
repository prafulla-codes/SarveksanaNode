const mongoose = require('mongoose');
let Survey = require('../models/SurveyModel');

function createSurvey(title,ipfs_path,res){

    let s = new Survey();
    s.title = title;
    s.ipfs_path = ipfs_path;

    s.save()
    res.json({is_successful:true})
}

module.exports = createSurvey;