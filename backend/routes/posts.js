import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send( 'omg please' );
});

router.get('/post', (req, res) => {
	res.send( '/post WORKS!' );
});


export default router;