//DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


// Setup Cors middleware
const whitelist = ['http://localhost:3000', 'http://localhost:3003']
const corsOptions = {
	origin: (origin, callback) => {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	},
	credentials:true
}

app.use(cors(corsOptions))

// Creating req.session
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false,
  	store: new MongoDBStore({ 
		uri: process.env.MONGODBURI, 
		collection: 'mySessions'
	})
}))

// SETUP mongoose
const db = mongoose.connection;
mongoose.connect('mongodb://127.0.0.1/chatroomDB',{
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

// set up listeners to monitor your DB connection

db.on('open', ()=> console.log('DB connected...'));
db.on('error', (error)=> console.log(error.message));
db.on('disconnected', ()=> console.log('Mongoose disconnected...'));


const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({msg:"login required"})
    }
}

// MIDDLEWARE
// this will tell the server to parse the JSON data, and create the req.body object.
app.use(express.json());

// controllers
app.use('/chat', isAuthenticated,  require('./controllers/chatController'))
app.use('/topics', isAuthenticated, require('./controllers/topicsController'))
app.use('/users', require('./controllers/usersController'))


app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
})