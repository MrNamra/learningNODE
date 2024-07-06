const express = require('express')
const route = express.Router()
const MenuItem = require('../models/manus');


route.post('/', async (req, res) => {
    try{
        const data = req.body;
        const newMenu = new MenuItem(data);
        const response = await newMenu.save();
        console.log('Data Saved');
        res.status(200).json(response);
    }catch(Err){
        console.log('Err')
        res.status(500).send('Internal server Error')
    }
})
  
route.get('/', async (req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('Data Fetch');
        res.status(200).json(data);
    }catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
})

route.get('/:taste', async (req, res) => {
    try{
        const teast = req.params.taste;
        const response = await MenuItem.find({test: teast});
        console.log('Data Fetch');
        res.status(200).json(response);
    }catch(err){
        console.log(err)
        res.status(500).send('Internal server Error')
    }
})

module.exports = route;