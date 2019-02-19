var express = require("express")
var bodyParser = require("body-parser")
var passport = require("passport")
var mongoose = require("mongoose")
var passportLocal = require("passport-local")
var passportLocalMongoose = require("passport-local-mongoose");
var expressSession = require("express-session");
var User = require("./User.js")

var app = express()

mongoose.connect("mongodb://localhost:27017/auth_demo",{useNewUrlParser:true})
app.use(bodyParser.urlencoded({extended:true}))
app.set("views","./ejs")

passport.use(new passportLocal(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(expressSession({
	secret:"qwerty",
	resave:false,
	saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())

app.get("/",function(req,res){
	res.render("home.ejs")
})

app.get("/register",function(req,res){
	res.render("register.ejs")
})

app.get("/login",function(req,res){
	res.render("login.ejs")
})

app.get("/logout",function(req,res){
	req.logout()
	res.redirect("/")
})

app.get("/secret",isLogout,function(req,res){
	res.render("secret.ejs")
})

app.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			console.log(err)
			res.redirect("/register")
		}
		else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/secret")
			})
		}
	})
})

app.post("/login",passport.authenticate("local",{
	successRedirect:"/secret",
	failureRedirect:"/login"
}),function(req,res){
})

function isLogout(req,res,next){
	if(req.isAuthenticated())
	{
		return next()
	}
	res.redirect("/login")
}

var server = app.listen("3000","127.0.0.1",function(){
	console.log("Connected to server.")
	console.log(server.address().port + " " + server.address().address)
})
