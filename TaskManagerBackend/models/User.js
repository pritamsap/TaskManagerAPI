const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


// Before Registering convert the user password into secure hash format
const userSchema = new mongoose.Schema({
    name: {type: String, required: true },
    email: {type: String, required: true, unqiue: true },
    password: {type: String, required: true },
}, {
    timestamps: true
});


// Just before saving if password is modified change it to hash format
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8); 
    }
    next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
