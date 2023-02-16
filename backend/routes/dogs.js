import express from 'express';
import mongoose from 'mongoose';
import Dog from '../models/dogs.js';

const router = express.Router();

// get dogs from db
router.get('/', async (req, res) => {
	const dogData = await Dog.find()
	return res.status(200).json({
		result: dogData
	  });
});

// store to db
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
  
// delete from db
router.delete('/:id', async (req, res) => {
	await Dog.findByIdAndDelete(res.params.id)
	
});

export default router;