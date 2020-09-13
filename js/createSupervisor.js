let Supervisor = require('../models/SupervisorModel');
const web3 = require('web3');
var Web3 = new web3('https://rinkeby.infura.io/v3/d6b43342c31a40adb8a951e1f144c768')
function createSupervisor(req,res){

    let account = Web3.eth.accounts.create();
    if(account==null || account==undefined){
        res.json({is_successful:false});
    }
    else
    {
        Supervisor.syncIndexes();
        let s = new Supervisor()
        s.userID = req.body.userID;
        s.password = req.body.password;
        s.department = req.body.department;
         s.address = account.address;
         s.private_key = account.privateKey;
         s.save();
         res.json({is_successful:true})
    }
}

module.exports = createSupervisor;