//nodemon server.js to run server
import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser"
const url = "mongodb://localhost:27017";

const server = express();

server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static("public"));


server.get('/signup', (req, res) => {
    res.cookie("SignUpCookie","KJ",{
        //secure: true, //doesn't work on local host
        httpOnly: true,
        sameSite: 'lax'
    });
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
server.get('/', (req, res) => {
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
//mongoose.connect(url);

mongoose.set('strictQuery', false);
const userCreatationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const userNamePassword = new mongoose.Schema({
    username: String,
    password: String
})
const UserSignUp = mongoose.model("users", userCreatationSchema); //User collection, info to add
const UserLogIn = mongoose.model("User", userNamePassword);


server.post("/user-signup", (req, res) =>{
    let myData = new UserSignUp(req.body);
    myData.save();
    res.redirect("/sethabits.html");

});

server.post("/user-login", (req, res) =>{
    let {username, password } = req.body;
    const expectedValue = "tj";
    UserLogIn.find({name: username, password: password}, function(err, result) {
    
        if (err) throw err;
        if(result.length == 0){
            valid(false);
        }else{
            valid(true);
        }
      });
    
    function valid (flag){
        if(flag){
            res.cookie("SignedInCookie",username,{
                //secure: true, //doesn't work on local host
                httpOnly: true,
                sameSite: 'lax'
            });
            res.redirect("/dashboard.html");
    
        }else{
            res.redirect("/login.html");
        }
    }
    
});
server.listen(3000, ()=>{
    console.log("server up");
})