const mongoos = require('mongoose');
const bcrypt = require('bcrypt'); 

// define hte persion schema
const personSchema = new mongoos.Schema({
    username: {
        type     : String,
        required : true,
        unique: true
    },
    name: {
        type     : String,
        required : true
    },
    password: {
        type     : String,
        required : true
    },
    age: {
        type: Number
    },
    work: {
        type     : String,
        enum     : ['chef', 'waiter', 'manager'],
        required : true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

personSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    }catch(err){
        console.log(err);
        return next(err);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        console.log(err);
        throw err;

    }
} 

// Create Persion Model
const Persion = mongoos.model('Persion', personSchema);
module.exports = Persion;