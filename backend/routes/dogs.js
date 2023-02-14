import express from 'express';
import mongoose from 'mongoose';
import Dog from '../models/dogs.js';

const router = express.Router();

router.get('/', (req, res) => {
	res.send( 'Dog route WORKS!' );
	// get dogs from mongodb
});


router.post("/register", async (req, res) => {
	const { name, contact, email, kakao, airport, message } = req.body;
	const addDog = new Dog ({
		"name": name,
		"contact": contact,
		"email": email,
		"kakao": kakao,
		//photo: req.body.photo,
		"airport": airport,
		"message": message
	});
	try {
		await addDog.save();
		res.send("item saved");
	  }
	  catch(err) {
		res.status(400).send("unable to save");
	  }
   });
   

export default router;