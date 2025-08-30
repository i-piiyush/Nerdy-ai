const express = require("express")
const app = express()


app.get("/",(req,res)=>{
    res.send("connected")
})
module.exports = app;