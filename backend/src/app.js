const express = require("express")
const app = express()

app.use(express.json())


app.get("/",(req,res)=>{
    res.send("connected")
})
module.exports = app;