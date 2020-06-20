const express = require('express');
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',
    database : 'smart-brain'
  }
});



const app = express();

app.use(express.json());

app.use(cors())

app.get('/', (req, res) => {
	db.select('*').from('users')
	.then(data => res.send(data))
	.catch(err => res.status(400).json("Error getting users"));
});

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {profile.handleImage(req, res, db)});

app.post('/face', (req, res) => {profile.handleFaceDetect(req, res)});


//Server ports
app.listen(3001, () => {
	console.log("Server is running on port 3001");	
});