const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
const cors = require('cors');

// MIDDLEWARE
app.use(express.json());

// SETUP Mongoose
mongoose.connect('mongodb://localhost:27017/holidaysDB',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
  useFindAndModify: false
});

// set up listeners to monitor your database connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (err)=> console.log(err.message));
db.on('disconnected', ()=> console.log('mongoose disconnected'));

// CONTROLLERS
app.use('/chat', require('./controllers/chatController'));
app.use('/topic', require('./controllers/topicController'));






app.listen(PORT, () => {
  console.log('ActiveChat listening at:', PORT, '🎉🎊',)
})