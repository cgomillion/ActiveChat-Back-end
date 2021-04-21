const express = require('express');
const topics = express.Router();
const topicsModel = require('../models/topicsModel');
const chatModel = require('../models/chatModel');
const usersModel = require('../models/usersModel');


// GET (index) list of holidays
topics.get('/', (req, res)=>{
	// res.send('Get route is working!!!');

	usersModel.findById(req.session.currentUser._id, (error, foundUser)=>{
		if (error){
			res.status(400).json(error)
		}
		else{

			res.status(200).json(foundUser)
		}
	})

});


// POST ROUTE
topics.post('/', (req, res)=>{
	console.log(req.session.currentUser);

	topicsModel.create(req.body, (error, createTopics)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{

			usersModel.findById(req.session.currentUser._id, (error, foundUser)=>{
				if (error) {
					res.status(400).json({ error: error.message })
				}
				else{
					foundUser.save()
					res.status(201).json(createTopics)
				}
			})
		}
	})
});


// DELETE ROUTE
topics.delete('/:id', (req, res)=>{

	topicsModel.findByIdAndDelete(req.params.id, (error, deletedTopics)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else if (deletedTopics === null){
			res.status(404).json({message: 'Topics id not Found'})
		}
		else{
			res.status(200).json({message: `Topic ${deletedTopics.name} deleted successfully`})
		}
	})
})


// UPDATE ROUTE
topics.put('/:id', (req, res)=>{

	topicsModel.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedTopics)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{
			res.status(200).json({
				message: `Topics ${updatedTopics.id} updated successfully`,
				data: updatedTopics
			})
		}
	})
})

// PATCH ROUTE increments numbers of likes
topics.patch('/addlikes/:id', (req, res)=>{

	topicsModel.findByIdAndUpdate(req.params.id, { $inc: { likes : 1} }, {new:true}, (error, updatedTopics)=>{
		if (error){
			res.status(400).json({error: error.message})
		}
		else{
			res.status(200).json({
				data: updatedTopics
			})
		}
	})
})

module.exports = topics;