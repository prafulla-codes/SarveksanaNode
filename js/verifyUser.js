var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Users = require('../models/UserModel')

function verifyUser(req,res,next)
{
    jwt.verify(req.headers.authorization,'sarveksana-user',(err,output)=>{
        if(err)
        {
            res.json({is_successful:false})
            console.log(err)
        }
        else
        {
            console.log(output);
            Users.findById(output,{password:0},(err,user)=>{
                if(err || output==null)
                {
                    res.json({is_successful:false});

                    console.log(err)
                }
                else
                {
                    console.log("FOUND USER");
                    console.log(user);
                    req.user = user;
                    next();
                }
            })
        }
    })
}

module.exports = verifyUser;