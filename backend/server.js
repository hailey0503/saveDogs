import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import postRoutes from './routes/posts.js';
import dogRoutes from './routes/dogs.js'; // router for dogs
import userProfileRoutes from './routes/userprofile.js'; // router for favorite
import uploadsRoutes from './routes/uploads.js';
import userRoutes from './routes/users.js';


console.log("Hello World")

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use('/', postRoutes); 
app.use('/dogs', dogRoutes);
app.use('/users', userRoutes);
app.use('/uploads', uploadsRoutes);
app.use('/userprofile', userProfileRoutes);

const dbURL = process.env.DB_URL;
const port = process.env.PORT||8000;


mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true})
	.then(() => app.listen(port, () => console.log("Server running on port: " + port)))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);


