const mongoose = require('mongoose');

const {Schema, model}= mongoose;

const topicsSchema = new Schema({

	name: {type:String},

})

const Topics = model('Bounties',topicsSchema)

module.exports = Topics
