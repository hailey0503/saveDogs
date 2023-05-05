import express from 'express';
//import user from '../controllers/user.js';
import { decode } from '../middlewares/firebase.js';
import Dog from '../models/dogs.js';
import multer from 'multer';


const Storage = multer.diskStorage({
	destination: 'uploads'
});


const register = multer({
	storage: Storage
}).single('testImage') 

const router = express.Router();

router
  
  .get('/', decode, async (req, res) => {
    console.log("get a dog");
    const { userId } = req.params
    console.log(userId)
  
    const dogData = await Dog.find()
    return res.status(200).json({
      result: dogData
      });
  
  });

router
  .put('/:_id', decode, async (req, res) => {
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

router
  .delete('/:_id', decode, async (req, res) => {
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

export default router;