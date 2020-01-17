const mongoose = require('mongoose')
const Users = require('../models/UserModel')
const jwt = require('jsonwebtoken')
function loginUser(userId,password,res){
    Users.findOne({$and:[{"userID":userId.toUpperCase()},{"password":password}]},{"password":0},(err,user)=>{
        if(err || user==null)
        {
            console.log("Failed to login.")
            console.log(err);
            res.json({is_successful:false})
        }
        else
        {
            var user_id = String(user._id);
            console.log(`user id is ${user_id}`)
            jwt.sign(user_id,'sarveksana-user',(err,token)=>{
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


module.exports=loginUser;