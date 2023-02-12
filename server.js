//nodemon server.js to run server
import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
const server = express();

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));


server.get('/signup', (req, res) => {
    res.cookie("SignUpCookie","KJ");
    res.redirect("signup.html")
});
server.get('/about', (req, res) => {
    res.redirect("about.html")
});
server.get('/dashboard', (req, res) => {
    res.redirect("dashboard.html")
});
server.get('/habits', (req, res) => {
    res.redirect("habits.html")
});
server.get('/index', (req, res) => {
    res.redirect("index.html")
});
server.get('/login', (req, res) => {
    res.redirect("login.html")
});
server.get('/profile', (req, res) => {
    res.redirect("profile.html")
});
server.get('/progress', (req, res) => {
    res.redirect("progress.html")
});
server.get('/sethabits', (req, res) => {
    res.redirect("sethabits.html")
});


mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/stride");
mongoose.set('strictQuery', false);
const userCreatationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const userName = new mongoose.Schema({
    name: String
})
const UserSignUp = mongoose.model("User", userCreatationSchema); //User collection, info to add
const User = mongoose.model("User", userCreatationSchema);



server.post("/user-signup", (req, res) =>{
    console.log("bye bye")
    let myData = new UserSignUp(req.body);
    myData.save();
    res.redirect("/sethabits.html");
    /*
    .then(item => {
        res.send("item saved to database");
    });
    */
});

server.listen(3000, ()=>{
    console.log("server up");
})