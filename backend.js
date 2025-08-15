const express = require('express')
const app = express();
const mongoose =require('mongoose');
const uri = 'mongodb+srv://venakatahema456:Kittupadhu8897@ukg.tcfdpa.mongodb.net/?retryWrites=true&w=majority&appName=UKG';

    const userSchema = new mongoose.Schema({
        Name:String,
        Age:Number,
        "Father name":String,
        "Mother name": String,
        Address :String
    });

const s = mongoose.model('peoples',userSchema);
mongoose.connect(uri,{dbName:'registration'}).then(()=>{
    console.log('database is connected');
}).catch((err)=>{
    console.error("db error",error.message);
})
app.use(express.urlencoded({extended:true}))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/registration.html');
});

app.post('/registration',async(req,res)=>{
    const{Name, Age,["Father name"]:fatherName,["Mother name"]:motherName,Address } = req.body;
    try{
        // const data = new s({Name,Age,"Father name":fatherName,"Mother name":motherName,Address});
const data = new s({Name,Age,"Father name":fatherName,"Mother name":motherName,Address});
await data.save();
res.send("thank you for registration");
    }catch{
        res.status(500).send("error saving data");
    }
})

app.get('/all',async(req,res)=>{
    try{
        const mydata = await s.find();
        res.json(mydata);
    }catch(err){
        console.log('error reterving users:',error.message);
        res.status(500).send('error retriving users');
    }
});


app.listen(3000,()=>{
    console.log("server runs on the http://127.0.0.1:3000");
})


