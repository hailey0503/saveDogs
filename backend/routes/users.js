import express from 'express';
// controllers
import user from '../controllers/user.js';
import { decode } from '../middlewares/firebase.js';

const router = express.Router();

router
  .post('/', decode, user.onCreateUser)
  .get('/uid/:uid', decode, user.onGetUserByUid)
  .get('/username', user.onIsUsernameAvailable)

export default router;