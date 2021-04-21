const mongoose = require('mongoose');
const { Schema, model } = mongoose;


const usersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
  
})

const User = model('User', usersSchema)
module.exports = User;