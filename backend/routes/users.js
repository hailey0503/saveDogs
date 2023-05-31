import express from 'express';
import { decode } from '../middlewares/firebase.js';
import Dog from '../models/dogs.js';
import multer from 'multer';
import bodyParser from 'body-parser';

import _  from "lodash"; 

const Storage = multer.diskStorage({
	destination: 'uploads'
});


const register = multer({
	storage: Storage
}).single('testImage') 

const router = express.Router();

router
  
  .get('/', decode, async (req, res) => {
    console.log("get a dog->routes.users 23");
  
    const dogData = await Dog.find()
    return res.status(200).json({
      result: dogData
    });
  
  });

router
  .put('/:_id', decode, bodyParser.json(),async (req, res) => {
    console.log("updating a dog data");
    const _id = req.params._id;
   
    register(req, res, (err)=>{
      const bodyInput = req.body
      //console.log(bodyInput)
      if (req.file) {
        bodyInput['image'] = req.file.path
      }
      console.log(bodyInput)
      
      if (err) {
        console.log(err);
      } else {
  
        Dog.findByIdAndUpdate(_id, 
          {
            $set: _.pickBy(bodyInput, _.identity)
          },
          {
            new: true
          },
          function(err, updated_data) {
          if (err) {
            res.send("Error updating data");
          } else {
            res.json(updated_data);
            console.log(updated_data)
          }
          }
        );
      }
    });  
  });

router
  .delete('/delete/:_id', decode, async (req, res) => {
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