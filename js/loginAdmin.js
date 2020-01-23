const mongoose = require('mongoose')
const Admin = require('../models/AdminModel')
const jwt = require('jsonwebtoken')
function loginAdmin(userId,password,res){
    Admin.findOne({$and:[{"userID":userId},{"password":password}]},{"password":0},(err,user)=>{
        if(err || user==null)
        {
            console.log("Failed to login.")
            console.log(err);
            res.json({is_successful:false})
        }
        else
        {
            var user_id = String(user._id);
            console.log(`user id is ${user}`)
            jwt.sign(user_id,'sarveksana-admin',(err,token)=>{
                if(err)
                {
                    console.log("Faield to sign jwt token")
                    console.log(err);
                    res.json({is_successful:false})
                }
                else
                {
                    res.json({is_successful:true,token:token})
                }
            })
        }
    })
}


module.exports=loginAdmin;