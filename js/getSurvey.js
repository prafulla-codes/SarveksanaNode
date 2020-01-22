const mongoose = require('mongoose');
let Survey = require('../models/SurveyModel');
function getSurvey(id,res){
    Survey.findById(id,(err,output)=>{
        if(err || output==null)
        {
            console.log(err);
            res.json({is_successful:false})
        }
        else
        {
            res.json({is_successful:true,survey:output})
        }
    })
}
module.exports = getSurvey;