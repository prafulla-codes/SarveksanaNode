var jwt = require('jsonwebtoken');
var Admin = require('../models/AdminModel');

function verifyAdmin(req,res,next){
    jwt.verify(req.headers.authorization,'sarveksana-admin',(err,output)=>{
        if(err)
        {
            console.log(err)
            res.json({is_successful:false})
        }
        else
        {
            console.log(output);
            Admin.findById(output,{password:0},(err,user)=>{
                if(err || output==null)
                {
                    res.json({is_successful:false})
                    console.log(err)
                }
                else
                {
                    console.log("FOUND SUPER USER");
                    console.log(user);
                    req.body=req.body;
                    req.user = user;
                    next();
                }
            })
        }
    })
}
module.exports = verifyAdmin;
