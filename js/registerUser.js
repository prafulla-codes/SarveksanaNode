const mongoose = require('mongoose');
const Users = require('../models/UserModel')
const web3 = require('web3');
var Web3 = new web3('https://rinkeby.infura.io/v3/d6b43342c31a40adb8a951e1f144c768')

function registerUser(firstName,lastName,userID,password,emailId,contactNumber,department,res){
    let account = Web3.eth.accounts.create();
    if(account==null || account==undefined){
        res.json({is_successful:false});
    }
    else
    {
        Users.syncIndexes();
        console.log(account)
        res.json({is_successful:true});
        var user = new Users();
        user.firstName = firstName;
        user.lastName = lastName;
        user.userID = userID;
        user.password = password;
        user.emailId = emailId;
        user.contactNumber = contactNumber;
        user.department = department;
        user.address = account.address;
        user.private_key = account.privateKey;
        user.save();
        res.json({is_successful:true})
    }
}

module.exports = registerUser
