var express = require('express');
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
var loginUser = require('./js/loginUser')

// Connect to database 
mongoose.connect('mongodb://localhost:27017/SarveksanaDB')
// Create A New Express App
var app = new express()
app.use(bodyParser.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
app.post('/loginUser',(req,res)=>{
    console.log("[/loginUser] Called!")
    userID = req.body.userID;
    password = req.body.password;
    loginUser(userID,password,res)

})

app.post('/createSurvey',(req,res)=>{
    console.log("[/createSurvey] Called");

    console.log(req.body)
    survey_title = req.body.survey_title;
    questions = req.body.questions;

})