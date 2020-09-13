var jwt = require('jsonwebtoken');
var Supervisor = require('../models/SupervisorModel');

function verifySupervisor(req,res,next){
    jwt.verify(req.headers.authorization,'sarveksana-supervisor',(err,output)=>{
        if(err)
        {
            console.log(err)
            res.json({is_successful:false})
        }
        else
        {
            console.log(output);
            Supervisor.findById(output,{password:0},(err,user)=>{
                if(err || output==null)
                {
                    res.json({is_successful:false})
                    console.log(err)
                }
                else
                {
                    console.log("FOUND SUPERVISOR");
                    console.log(user);
                    req.body=req.body;
                    req.user = user;
                    next();
                }
            })
        }
    })
}
module.exports = verifySupervisor;
