const express=require("express")
const {connection}= require("./config/db")
const {userRouter}=require("./Routes/User.route")
const {noteRouter}=require("./Routes/Note.route")
const {authenticate}=require("./Middlewares/authenticate.middleware")
const cors = require("cors")
require('dotenv').config()


const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Home Page")
}) 

app.use("/user",userRouter)
app.use(authenticate)
app.use("/notes",noteRouter)




app.listen(process.env.Port,async()=>{
    try{
        await connection
        console.log("Connected to database")
    }catch(err){
        console.log("Problem connecting")
        console.log(err)
    }
    console.log("Port running")
})
