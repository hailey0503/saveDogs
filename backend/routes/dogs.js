import express from 'express';
import mongoose from 'mongoose';
import Dog from '../models/dogs.js';
import multer from 'multer';
import { decode } from '../middlewares/firebase.js';
import admin from 'firebase-admin';

const router = express.Router();

const Storage = multer.diskStorage({
	destination: 'uploads'
});

const register = multer({
	storage: Storage
}).single('testImage') 

// get dogs from db 
router.get('/', async (req, res) => {
	const dogData = await Dog.find()
	return res.status(200).json({
		result: dogData
	  });
});

// store to db
router.post("/register", async (req, res) => {
	console.log("post a dog");
	const { authtoken } = req.headers;
	console.log(authtoken)
	console.log('req', req)
	console.log('req.body',req.body)
	console.log('req.file',req.file)

	register(req, res, (err)=>{
		//console.log('req in reqest', req)
		console.log('req.body in register',req.body)
		
		if (err) {
			console.log(err);
		} else {
			const addDog = new Dog ({
				name: req.body.name,
				image: req.file.path,
				contact: req.body.contact,
				email: req.body.email,
				address: req.body.address,
				airport: req.body.airport,
				message: req.body.message,
				uid: req.body.uid
			});
			addDog.save(function(err, postedDog) {
				if (err) {
					console.log("Error saving dog info");
					console.log(err)
				} else {
					res.json(postedDog)
				}
			});
		}
	})
});	

export default router;