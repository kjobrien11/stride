//nodemon server.js to run server
import express from "express";
import mongodb from "mongodb";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const server = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/stride");
mongoose.set('strictQuery', false);
const schema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});
const User = mongoose.model("User", schema);
server.use(express.static("public"));
server.use(bodyParser.urlencoded({ extended: true }));

server.post("/user-signup", (req, res) =>{
    var myData = new User(req.body);
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