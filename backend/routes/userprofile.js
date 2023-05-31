import express from 'express';
import mongoose from 'mongoose';
import UserProfile from '../models/userprofile.js';
import admin from 'firebase-admin';

const router = express.Router();

// get user profile from db 
router.get('/', async (req, res) => {
    
	const Data = await UserProfile.find(function (err, docs) {
		if (err){
			console.log(err);
		} else{
			console.log("Result : ", docs);
			return res.status(200).json({
				result: docs
			  });
		}	
	})
});	

router
  .post("/", async (req, res) => {
    console.log("adding a favorite 22");
    const body = req.body;
    console.log(body)
	const uid = req.body.uid
	const favorite = req.body.favorite
	console.log('27', favorite)
	await UserProfile.find({ "uid": uid }, function (err, docs) {
		if (err){
			console.log(err);
		} else{
			console.log("Result : ", docs);
			if (docs.length === 0) {
				console.log('34')
				const addProfile = new UserProfile (
					req.body
				)
				console.log('38', addProfile)
				addProfile.save(function(err, postedUserProfile) {
					console.log('40')
					if (err) {
						console.log("Error saving user profile");
						console.log(err)
					} else {
						res.json(postedUserProfile)
					}
				});
			} else {
				UserProfile.updateOne(
					{ "uid": uid },
					{
						$push: {
							favorite: favorite 
						}
					}, function(err, docs) {
					if (err) {
						return res.status(422).send(err);
					} else {
						console.log('route 59'. docs)
						res.json({
							success: true, 
							message: 'added new user favorite->route 62'
						  });
					}
					
				});
			}
		}
	});
});
	
	
	

export default router;