const mongoose = require('mongoose');
const {Schema, model}= mongoose;

const chatSchema = new Schema({

	text: {type:String},

})

const Chats = model('chat',chatSchema)

module.exports = Chats