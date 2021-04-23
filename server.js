const express =require ("express")
 const app=express()
const connectDB=require('./config/connectDB')
const User=require('./models/User')
// const router=express.Router()
 
 connectDB() //i call the function that connect to the DB

app.use(express.json())  //convert json to read req.body

 

 
  
//Find all persons   :
app.get('/api/users/',async(req,res)=>{
    try {
        const Users=await User.find()
        res.status(200).send({msg:"User is find",Users})
    } catch (error) {
        res.status(500).send("impossible to find user")
    }
})
 
//add a person :
app.post('/api/users/',async(req,res)=>{
    try {
        const {name,email,phone}=req.body
        if(!name||!email){
            return res.status(400).send("name and email are required")
        }
        const userUniq=await User.findOne({email})
        if (userUniq){
            return res.status(400).send("User already exist")
        }
        const user=new User({
            name,email,phone
        })
        await user.save()
        res.status(200).send({msg:"the user is added",user})
    } catch (error) {
        res.status(500).send("impossible to add user")
    }
})
    


//Find person by _id then edit :
    app.put('/api/users/:Id',async(req,res)=>{
    try {
        const{Id}=req.params
        const user=await User.findOneAndUpdate({_id:Id},{$set:{...req.body}})
        res.status(200).send({msg:"user is find",user})
    } catch (error) {
        res.status(500).send("impossible to find user")
    }
})
     
    //Find person by _id and remove it :
    app.delete('/api/users/:Id',async(req,res)=>{
    try {
        const{Id}=req.params
        const user=await User.findByIdAndDelete(Id)
        res.status(200).send({msg:"user is deleted",user})
    } catch (error) {
        res.status(500).send("impossible to delete users")
    }
})
 
   


const port=5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})