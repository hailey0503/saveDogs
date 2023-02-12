import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send( 'DT WORKS!' );
});

router.get('/post', (req, res) => {
	res.send( 'DT WORKS!' );
});


export default router;