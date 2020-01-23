let express = require('express');
let bodyParser = require('body-parser')
const mongoose = require('mongoose');
let loginUser = require('./js/loginUser')
let loginAdmin = require('./js/loginAdmin');
let loginSuperuser = require('./js/loginSuperuser')

let registerUser = require('./js/registerUser')
let createSurvey = require('./js/createSurvey');
let verifyUser = require('./js/verifyUser');
let verifyAdmin = require('./js/verifyAdmin')
let verifySuperuser = require('./js/verifySuperuser');
let getSurveys = require('./js/getSurveys');
let getSurvey = require('./js/getSurvey');
let createAdmin = require('./js/createAdmin');
// Connect to database 
mongoose.connect('mongodb://localhost:27017/SarveksanaDB')
// Create A New Express App
var app = new express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
// <---- End Of Setting Up CORS --->
const PORT = 25565;
// APP LISTEN
app.listen(PORT,()=>{
    console.log("Sarveksana Backend is running..")
})
app.get('/',(req,res)=>{
    res.send("hi")
})
// Logins
app.post('/loginUser',(req,res)=>{
    console.log("[/loginUser] Called!")
    userID = req.body.userID;
    password = req.body.password;
    loginUser(userID,password,res)

})
app.post('/loginSuperuser',(req,res)=>{
    console.log("[/loginSuperuser] Called");
    userID = req.body.userID;
    password = req.body.password;
    loginSuperuser(userID,password,res)

})
app.post('/loginAdmin',(req,res)=>{
    console.log("[/loginAdmin] Called");
    userID = req.body.userID;
    password = req.body.password;
    loginAdmin(userID,password,res);
})
// End of Logins
////---------- CREATE SURVEY ----------------------------------

app.post('/createSurvey',(req,res)=>{
    console.log('[/createSurvey] Called');
    console.log(req.body);

    let survey_title = req.body.survey_title;
    let ipfs_path = req.body.ipfs_path;
    let ipfs_hash = req.body.ipfs_hash;
    let ipfs_size = req.body.ipfs_size;
    createSurvey(survey_title,ipfs_path,ipfs_hash,ipfs_size,res);
})
////-----------REGISTER USER ----------------------------------
app.post('/registerUser',(req,res)=>{
    console.log("[/registerUser] Called");
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var userId = req.body.userID.toUpperCase();
    var password = req.body.password;
    var emailId = req.body.email;
    var contactNumber =  req.body.contactNumber;
    var department = req.body.department;
    registerUser(firstName,lastName,userId,password,emailId,contactNumber,department,res);
})
////--------------- CREATE ADMIN -------------------------------
app.post('/createAdmin',verifySuperuser,(req,res)=>{
    console.log("[Create Admin] Called, Superuser verified")
    createAdmin(req,res);
})
////-----------------------------------------------------------

// <---- Verifications  ------>
app.get('/verifyUser',(req,res,next)=>{
  verifyUser(req,res,next);
},(req,res)=>{
    var user = req.user;
    res.json({is_successful:true,user:user})

})
app.get('/verifySuperuser',(req,res,next)=>{
 console.log("[verifySuperuser] Called")
 console.log(req.headers.authorization)
 verifySuperuser(req,res,next);
},(req,res)=>{
    var user = req.user;
    res.json({is_successful:true,user:user})
})

app.get('/verifyAdmin',(req,res,next)=>{
    console.log("[verifyAdmin] Called")
    console.log(req.headers.authorization)
    verifyAdmin(req,res,next);
   },(req,res)=>{
       var user = req.user;
       res.json({is_successful:true,user:user})
   })
// <----- End of Verifications
app.get('/getSurveys',(req,res)=>{
    getSurveys(res);
})

app.post('/getSurvey',(req,res)=>{
    let id = req.body.id;
    getSurvey(id,res);
})