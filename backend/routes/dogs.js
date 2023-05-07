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
/*
router.get('/:userId', async (req, res) => {
	console.log("post a dog");
	const { userId } = req.params
	const _id = req.params._id;
	console.log(authtoken)
	console.log(userId)

	
	const [respond, error] = await decode(req, res, next)
	const user = onGetUserByUid(userId)
	if (user) {
		res.json(user)
	} else {
		res.setStatus(404)
	}

})
*/

// store to db
router.post("/register", async (req, res) => {
	console.log("post a dog");
	const { authtoken } = req.headers;
	console.log(authtoken)
	console.log('req', req)
	console.log('req.body',req.body)
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
				kakao: req.body.kakao,
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
//router.post('/', decode, user.onCreateUser)
// delete from db but it's deleted in order not by _id
/*
router.delete('/:_id', async (req, res) => {
	console.log("deleting a dog data");
	
	const _id = req.params._id;
	
	await Dog.findByIdAndRemove(_id, function(err, deleted_data){
		if (err) {
			res.send("errer deleting a dog data");
		} else {
			res.json(deleted_data);
		}
	});
});

router.put("/:_id", async (req, res) => {
	console.log("updating a dog data");
	const { updates } =req.body
	const _id = req.params._id;

	await Dog.findByIdAndUpdate(_id, 
		   {
				$set: {name: req.body.name, contact: req.body.contact, email: req.body.email} 
		   },
		   {
				new: true
		   },
		   function(err, updated_data) {
			if (err) {
				res.send("Error updating data");
			} else {
				res.json(updated_data);
			}
		   }
		 );
});
*/

export default router;