const express = require("express");
const router = express.Router();
const Persion = require('../models/Person');
const {jwtAuthMiddleware, generateToekn} = require('./../jwt')

router.post("/singup", async (req, res) => {
  try {
    const data = req.body;

    // create new persion document using mongoos model
    const newPersioon = new Persion(data);
    // // to aviod this direct pass data
    // newPersioon.name = data.name;
    // newPersioon.age = data.age;
    // newPersioon.mobile = data.mobile;
    // newPersioon.email = data.email;
    // newPersioon.address = data.address;

    // save data to database
    const response = await newPersioon.save();
    console.log("Data Saved");

    const paylode = {
        id : response.id,
        username : response.username,
    } 

    console.log(JSON.stringify(paylode))
    const token = generateToekn(paylode);
    console.log("paylode is: ",paylode)
    console.log("Token is: ",token)

    res.status(200).json({response: response, token: token});
  } catch (err) {
      console.log(err);
    console.log("Data Save fail");
    res.status(500).json({ error: "Internal server Error" });
  }
});

// get method to get persion
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
      console.log("data Fetched Success");
      const data = await Persion.find();
      res.status(200).json(data);
  } catch (Err) {
    console.log("Data fetch fail: ", Err);
    res.status(500).json({ error: "Internal server Error" });
  }
});

// login route
router.post('/login', async (req, res) => {
    try{
        // ext username & passoword
        const {username, password} = req.body

        // find username in db
        const user = await Persion.findOne({username: username})
        if(!user || !(await user.comparePassword(password))) return res.status(401).json({ error: "Invalide Usernme or Password!"})

        // gen token
        const paylode = {
            id : user.id,
            username : user.username
        }
        const token = generateToekn(paylode);

        // return token as response
        res.status(200).json({token: token})
    }catch(err){
        console.log(err)
        res.status(500).json({ error : "Internal Server error"})
    }
})

// profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try{
        const userData = req.user
        console.log("User Data: ",userData)
         
        const userID = userData.id
        const user = await Persion.findById(userID)

        res.status(200).json({user})
    }catch(err){
        console.log(err)
        res.status(500).json({ error : "Internal server Error"})
    }
})

router.get('/:workType', async (req, res)=> {
    try{

        const workType = req.params.workType;
        if(workType == 'waiter' || workType == 'manager' || workType == 'chef'){
        const response = await Persion.find({work: workType});
        console.log('response Fetched');
        res.status(200).json(response);
        }else{
        res.status(404).json({error: "Invalid work Type"});
        }
    }catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
})

// for update
router.put('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const response = await Persion.findByIdAndUpdate(id, updatedData, {
            new: true,
            runValidators: true,
        });
        if(!response){
            return res.status(404).json({error: "Persion Not Found"})
        }
        console.log('data updated');
        res.status(200).send(response)
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error')
    }
})

// for delete
router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const response = await Persion.findByIdAndDelete(id);
        if(!response){
            return res.status(404).json({error: "Persion Not Found"})
        }
        console.log('data Deleted');
        res.status(200).send("Delted successfully")
    }catch(err){
        console.log(err);
        res.status(500).send('Internal server error')
    }
})
  
module.exports = router;