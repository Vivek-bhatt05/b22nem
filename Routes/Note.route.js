const express=require("express")
const {NoteModel}=require("../models/Note.model")
const noteRouter=express.Router()



noteRouter.get("/",async(req,res)=>{
   try{
      const notes= await NoteModel.find()
      res.send(notes)
   }catch(err){
      console.log(err)
      res.send("Something Went Wrong")
   }
})


noteRouter.post("/create",async(req,res)=>{
   const payload=req.body
   try{
    const newNote= new NoteModel(payload)
    await newNote.save()
    res.send("Created a note")
   }catch(err){
    console.log(err)
    res.send({"msg":"Something Went Wrong"})
   }
})

noteRouter.patch("/update/:id",async(req,res)=>{
   const ID=req.params.id
    const payload=req.body
    const note= await NoteModel.findOne({"_id":ID})
    const userId_in_note= note.userID
    const userId_making_request=req.body.userID
    try{
      if( userId_making_request !== userId_in_note ){
         res.send("You are not authorized")
      }else{
         await NoteModel.findByIdAndUpdate({_id:ID},payload)
         res.send("Updated a note")
      }
   }catch(err){
      console.log(err)
      res.send("Something Went Wrong")
   }
 })

 noteRouter.delete("/delete/:id",async(req,res)=>{ 
   const ID=req.params.id
   const note= await NoteModel.findOne({"_id":ID})
   const userId_in_note= note.userID
   const userId_making_request=req.body.userID
   try{
      if( userId_making_request !== userId_in_note ){
         res.send("You are not authorized")
      }else{
         await NoteModel.findByIdAndDelete({_id:ID})
         res.send("Deleted a note")
      }
  }catch(err){
     console.log(err)
     res.send("Something Went Wrong")
  }
 })


module.exports={
    noteRouter
}