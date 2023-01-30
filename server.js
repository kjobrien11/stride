//nodemon server.js to run server
import express from "express";

const server = express();

server.use(express.static("public"));

server.listen(3000, ()=>{
    console.log("server up");
})