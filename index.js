const express = require('express');
const User = require('./models/user_model');
var cron = require('node-cron');
require("./db/connection");
const app = express();

const port = 1000;

app.use(express.json());

cron.schedule('*/2 1-20 1-18 1-6 7 3', () => {
  console.log(`running ${Math.random()}`);
},);

// corn.schedule("* * * * * *",()=>{
//   console.log("Running");
// });















app.get("/", (req, res) => {
  res.send("HOME PAGE");
});

app.post("/addUser", async (req, res) => {
  console.log(req.body);

  try {
    const user = new User(req.body);
    const addUserDB = user.save();
    res.status(201).send(addUserDB);

  } catch (e) {
    res.status(400).send(e);
  }


  // user.save().then(()=>{
  //   res.status(201).send(user);
  //   console.log("Added into DB");
  // }).catch((e)=>{
  //   res.send(e);
  //   console.status(400).log("Not Added into DB");
  // });

});



// getting Users

app.get("/users",async (req,res)=>{
  try {
    const usersData =  await User.find();
    res.send(usersData);
  } catch (e) {
    res.send(e);
  }
});

// get Single Specific User

app.get("/user/:id",async (req,res)=>{
  try {
    
    const id = req.params.id;
    const singleUser =  await User.findById(id);

    console.log(singleUser);
    res.send(singleUser);
  } catch (e) {
    res.send(e);
  } 
});


// Update User Detail

app.patch("/update/:id", async (req,res)=>{
  try {
    const id = req.params.id;
    const update = await  User.findByIdAndUpdate(id,req.body,{
      new : true
    });
    console.log(update);
    res.status(200).send(update);
  } catch (e) {
      res.status(404).send(e);
  }
});



// Delete User 

app.delete("/delete/:id",async (req,res)=>{ 
  try {
    const id = req.params.id;
    const deleteUser = await User.findByIdAndDelete(id);
    if (!id) {
        res.send("Invalid ID");
    }else{
      res.status(200).send(deleteUser);
    }

  } catch (e) {
    res.status(500).send(e);
  }
});


// Listening port

app.listen(port, () => {
  console.log(`LocalHost is Running ${port}`);
});



function fun1(){
  var data = 10;
}

function fun2(){
  fun1();
  console.log(data);
}

fun2();