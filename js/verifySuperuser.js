var jwt = require('jsonwebtoken');
var SuperUser = require('../models/SuperUserModel');

function verifySuperuser(req,res,next){
    jwt.verify(req.headers.authorization,'sarveksana-superuser',(err,output)=>{
        if(err)
        {
            console.log(err)
            res.json({is_successful:false})
        }
        else
        {
            console.log(output);
            SuperUser.findById(output,{password:0},(err,user)=>{
                if(err || output==null)
                {
                    res.json({is_successful:false})
                    console.log(err)
                }
                else
                {
                    console.log("FOUND SUPER USER");
                    console.log(user);
                    req.user = user;
                    next();
                }
            })
        }
    })
}
module.exports = verifySuperuser;
