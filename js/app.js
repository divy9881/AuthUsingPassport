var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var passport = require("passport")
var passportLocal = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose")
var expressSession = require("express-session")
var mongoose = require("mongoose")
var User = require("./User.js")

mongoose.connect("mongodb://localhost:27017/auth_demo",{useNewUrlParser:true});

app.set("views","./ejs")

app.get("/",function(req,res){
	res.render("home.ejs")
})

var server = app.listen("3000","127.0.0.1",function(){
	console.log("Connected to the Server.")
	console.log(server.address().port + " " + server.address().address)
})