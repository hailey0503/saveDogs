//import winston from '../config/winston.js'
import * as admin from 'firebase-admin';
//import credentials from './credentials.json' assert { type: "json" };

/*
admin.initializeApp( {
	credential: admin.credential.cert(credentials)

}) 
*/

const defaultApp = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY
  })
});

const auth = defaultApp.auth()

export const decode = async (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(400).json({ success: false, message: 'No access token provided' });
  }
  const idToken = req.headers.authorization.split(' ')[1];
  try {
    // winston.debug('idToken from decode', idToken)
    const decodedToken = await auth.verifyIdToken(idToken)
    req.uid = decodedToken.uid;
    return next();
  } catch (error) {
    winston.error('decode error: ', error)
    return res.status(401).json({ success: false, message: error.message });
  }
};