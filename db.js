const mongoose = require('mongoose')
require('dotenv').config()

// define mongodb connaction URL
const mongoURL = process.env.DB_URL;

// set up mongodb connection
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

// define event Listner
db.on('connected', () => {
    console.log("connected to mongodb server");
})

db.on('error', (err) => {
    console.log("MongoDB connection error: ", err);
})

db.on('disconnected', () => {
    console.log("MongoDB DisConnected ");
})

// export the database connection
module.exports = db;