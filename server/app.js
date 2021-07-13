//nb 
require('dotenv').config()
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const authMiddleware  = require('./middleware/auth');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const decksRouter =  require('./routes/decks');
const { DB_URI }  = process.env;
const app = express();

console.log('server Connected...');
console.log(DB_URI);
const DB = async () => {
	try {
		await mongoose.connect(DB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};
DB();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/deck', authMiddleware, decksRouter);

/**
 * Methods to create
 * Create Deck user title is_public
 * Delete Deck deckId
 * Update Deck
 * 
 * Create Card user deckId front back
 * Update Card
 * Delete card
 * 
 * 
 * 
 */

module.exports = app;
