let Admin = require('../models/AdminModel');
const web3 = require('web3');
var Web3 = new web3('https://rinkeby.infura.io/v3/d6b43342c31a40adb8a951e1f144c768')
function createAdmin(req,res){

    let account = Web3.eth.accounts.create();
    if(account==null || account==undefined){
        res.json({is_successful:false});
    }
    else
    {
        Admin.syncIndexes();
        let admin = new Admin()
         admin.userID = req.body.userID;
         admin.password = req.body.password;
         admin.department = req.body.department;
         admin.address = account.address;
         admin.private_key = account.privateKey;
         admin.save();
         res.json({is_successful:true})
    }
}

module.exports = createAdmin;