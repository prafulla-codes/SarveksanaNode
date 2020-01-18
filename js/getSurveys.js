const mongoose = require('mongoose');
let Survey = require('../models/SurveyModel');

function getSurveys(res){
    Survey.find({},(err,output)=>{
        if(err || output==null)
        {
            console.log(err);
            res.json({is_successful:false})
        }
        else
        {
            res.json({is_successful:true,surveys:output})
        }
    })
}

module.exports = getSurveys;