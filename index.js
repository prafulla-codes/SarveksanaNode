let express = require("express");
let bodyParser = require("body-parser");
const mongoose = require("mongoose");
const http = require("http");
const https = require("https");
const fs = require("fs");
let loginUser = require("./js/loginUser");
let loginAdmin = require("./js/loginAdmin");
let loginSupervisor = require("./js/loginSupervisor");

let registerUser = require("./js/registerUser");
let createSurvey = require("./js/createSurvey");
let verifyUser = require("./js/verifyUser");
let verifyAdmin = require("./js/verifyAdmin");
let verifySupervisor = require("./js/verifySupervisor");
let getSurveys = require("./js/getSurveys");
let getSurvey = require("./js/getSurvey");
let createSupervisor = require("./js/createSupervisor");
// Connect to database
mongoose.connect(
  "mongodb+srv://pika:pika123@cluster1.1ajyi.gcp.mongodb.net/SarveksanaDB?retryWrites=true&w=majority"
);
// Create A New Express App
var app = new express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
// <---- End Of Setting Up CORS --->
// APP LISTEN
http.createServer(app).listen(8080);
var sslOptions = {
  passphrase: "1234",
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};
https.createServer(sslOptions, app).listen(25565);

app.get("/", (req, res) => {
  res.send("hi");
});
// Logins
app.post("/loginUser", (req, res) => {
  console.log("[/loginUser] Called!");
  userID = req.body.userID;
  password = req.body.password;
  loginUser(userID, password, res);
});
app.post("/loginSupervisor", (req, res) => {
  console.log("[/loginSupervisor] Called");
  userID = req.body.userID;
  password = req.body.password;
  loginSupervisor(userID, password, res);
});
app.post("/loginAdmin", (req, res) => {
  console.log("[/loginAdmin] Called");
  userID = req.body.userID;
  password = req.body.password;
  loginAdmin(userID, password, res);
});
// End of Logins
////---------- CREATE SURVEY ----------------------------------

app.post("/createSurvey", (req, res) => {
  console.log("[/createSurvey] Called");
  console.log(req.body);

  let survey_title = req.body.survey_title;
  let ipfs_path = req.body.ipfs_path;

  createSurvey(survey_title, ipfs_path, res);
});
////-----------REGISTER USER ----------------------------------
app.post("/registerUser", (req, res) => {
  console.log("[/registerUser] Called");
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var userId = req.body.userID.toUpperCase();
  var password = req.body.password;
  var emailId = req.body.email;
  var contactNumber = req.body.contactNumber;
  var department = req.body.department;
  registerUser(
    firstName,
    lastName,
    userId,
    password,
    emailId,
    contactNumber,
    department,
    res
  );
});
////--------------- CREATE ADMIN -------------------------------
app.post("/createSupervisor", verifyAdmin, (req, res) => {
  console.log("[Create Supervisor] Called, Admin verified");
  createSupervisor(req, res);
});
////-----------------------------------------------------------

// <---- Verifications  ------>
app.get(
  "/verifyUser",
  (req, res, next) => {
    verifyUser(req, res, next);
  },
  (req, res) => {
    var user = req.user;
    res.json({ is_successful: true, user: user });
  }
);

app.get(
  "/verifySupervisor",
  (req, res, next) => {
    console.log("[verifySupervisor] Called");
    console.log(req.headers.authorization);
    verifySupervisor(req, res, next);
  },
  (req, res) => {
    var user = req.user;
    res.json({ is_successful: true, user: user });
  }
);

app.get(
  "/verifyAdmin",
  (req, res, next) => {
    console.log("[verifyAdmin] Called");
    console.log(req.headers.authorization);
    verifyAdmin(req, res, next);
  },
  (req, res) => {
    var user = req.user;
    res.json({ is_successful: true, user: user });
  }
);
// <----- End of Verifications
app.get("/getSurveys", (req, res) => {
  getSurveys(res);
});

app.post("/getSurvey", (req, res) => {
  let id = req.body.id;
  getSurvey(id, res);
});
