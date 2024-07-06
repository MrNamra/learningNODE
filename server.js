const express = require('express');
const { size } = require('lodash');
const app = express();
const db = require('./db');
require('dotenv').config();
// const Person = require('./models/Person'); 
const Person = require('./auth'); 
const passport = require('./auth');
const bodyParsear = require('body-parser')

// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;


const PORT = process.env.PORT || 3000;

app.use(bodyParsear.json());

// middeleware fun
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to ${req.originalUrl}`)
  next();
};

app.use(logRequest)

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});

app.get('/', function (req, res) {
  res.send('Hello World')
});
// // for single route
app.get('/', localAuthMiddleware, function (req, res) {
  res.send('Hello World')
});

// old method
// app.get('/', passport.authenticate('local', {session: false}), function (req, res) {
//   res.send('Hello World')
// });

//import routers menu
const menuRoutes = require('./routes/manuRoute')
app.use('/menu', localAuthMiddleware, menuRoutes)

// import routers
const personRoutes = require('./routes/personRoute')
app.use('/person', personRoutes)

app.listen(PORT, () => {
  console.log('Server is listening on PORT 3000')
});

// // old routes
// app.get('/idli', function (req, res) {
//     var comstmize_idel = {
//         name: "rava Idli",
//         size: "10cm diameater",
//         is_sambhar: true,
//         is_chutani: false
//     }  
//     res.send(comstmize_idel)
// });

// app.post('/items', function(req, res) {
//     res.send('data is here');
// });