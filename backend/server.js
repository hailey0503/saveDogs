import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
console.log("Hello World")

import postRoutes from './routes/posts.js';
import dogRoutes from './routes/dogs.js'; // router for dogs

const app = express();

app.use('/', postRoutes);
app.use('/dogs', dogRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

//const CONNECTION_URL = 'mongodb+srv://dog:dog@cluster0.vsmx9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const CONNECTION_URL = 'mongodb://127.0.0.1:27017';
const PORT = process.env.PORT || 4200;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT, () => console.log("Server running on port: " + PORT)))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);


//clinet address : www.myapp.com - react
//server address : api.myapp.com - nodejs