//DEPENDENCIES
const express = require('express');
const app = express();
const PORT = 3003;
const mongoose = require('mongoose');
const cors = require('cors')
const session = require('express-session');

// MIDDLEWARE
// this will tell the server to parse the JSON data, and create the req.body object.
app.use(express.json());

// Setup Cors middleware
const whitelist = ['http://localhost:3000']
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



// SETUP mongoose
mongoose.connect('mongodb://localhost:27017/chatroomDB',{
	useNewUrlParser:true,
	useUnifiedTopology: true,
	useFindAndModify: false
});

// set up listeners to monitor your DB connection
const db = mongoose.connection;
db.once('open', ()=> console.log('DB connected...'));
db.on('error', (error)=> console.log(error.message));
db.on('disconnected', ()=> console.log('Mongoose disconnected...'));


//
app.use(session({
	secret: 'JustKiding',
	resave: false,
	saveUninitialized: false
}))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({msg:"loging require"})
    }
}


// controllers
app.use('/chat', isAuthenticated,  require('./controllers/chatController'))
app.use('/topics', require('./controllers/topicsController'))
app.use('/users', require('./controllers/usersController'))


app.listen(PORT, ()=>{
	console.log(`Server is listening on port ${PORT}`);
})
