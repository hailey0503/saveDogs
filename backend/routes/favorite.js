import express from 'express';
import mongoose from 'mongoose';
import Favorite from '../models/favorite.js';
import admin from 'firebase-admin';

const router = express.Router();

// get dogs from db 
router.get('/', async (req, res) => {
	const uid = req.params._id;
    console.log(uid)
    console.log('favorite.req.body',req.body)
	const favoriteData = await Favorite.find()
	return res.status(200).json({
		result: favoriteData
	  });
	
});

router
  .post("/", async (req, res) => {
    console.log("adding a favorite");
    const body = req.body;
    console.log(body)
	const uid = req.body.uid
	const dogId = req.body.dogId
	const addFavorite = new Favorite (
		body
	);
	addFavorite.save(function(err) {
		if (err) {
		  return res.status(422).send(err);
		}
	
		res.json({
		  success: true, 
		  message: 'added new favorite'
		});
	
	  });
	})
	
	
	

export default router;