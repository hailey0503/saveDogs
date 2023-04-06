import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import postRoutes from './routes/posts.js';
import dogRoutes from './routes/dogs.js'; // router for dogs
import uploadsRoutes from './routes/uploads.js';

console.log("Hello World")

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use('/', postRoutes); 
app.use('/dogs', dogRoutes);
app.use('/uploads', uploadsRoutes);

const dbURL = process.env.DB_URL 
const PORT = process.env.PORT || 4800;

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(PORT, () => console.log("Server running on port: " + PORT)))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);



//clinet address : www.myapp.com - react
//server address : api.myapp.com - nodejs