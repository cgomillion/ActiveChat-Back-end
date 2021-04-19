const mongoose = require('mongoose');

const {Schema, model}= mongoose;

const topicsSchema = new Schema({
	
	text: {type:String},

})

const Topics = model('Bounties',topicsSchema)

module.exports = Topics
