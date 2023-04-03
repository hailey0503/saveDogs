import express from 'express';
import mongoose from 'mongoose';
import Dog from '../models/dogs.js';
import multer from 'multer';

const router = express.Router();
const Storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
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
	register(req, res, (err)=>{
		if (err) {
			console.log(err)
		} else {
		
			const addDog = new Dog ({
				name: req.body.name,
				contact: req.body.contact,
				email: req.body.email,
				kakao: req.body.kakao,
				image: {
					data:req.file.filename,
					contentType: 'image/png'
				},
				airport: req.body.airport,
				message: req.body.message
			});
			try {
				addDog.save();
				res.send("item saved");
				}
				catch(err) {
				res.status(400).send("unable to save");
				}
			}		
		});
	});	
  
// delete from db
router.delete('/:id', async (req, res) => {
	await Dog.findByIdAndDelete(res.params.id)
	
});

export default router;