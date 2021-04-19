const express = require('express');
const app = express.Router();
const chatModel = require('../models/chatModel');
//socket.io integration
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);



//show
app.get('/', (req, res)=>{
	console.log('index route')
	chatModel.find({}, (error, foundChats)=>{
		if (error){
			res.status(400).json(error)
		}
		else{
			res.status(200).json(foundChats)
		}
	})

});

//socket.io
io.on('connection', (socket) => {
    console.log('new client connected');
});

//post
app.post('/', (req, res)=>{

	chatModel.create(req.body, (error, createChat)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{
			res.status(201).json(createChat)
		}
	})

});


module.exports = app;
