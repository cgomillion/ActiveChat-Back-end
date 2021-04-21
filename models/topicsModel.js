const mongoose = require('mongoose');
const {Schema, model}= mongoose;

const topicsSchema = new Schema({

	name: {type:String},

})

const Topics = model('Topics',topicsSchema)

module.exports = Topics