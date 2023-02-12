import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
	res.send( 'Dog route WORKS!' );
	// get dogs from mongodb
});

router.post('/register', (req, res) => {
	// register a dog to mongodb
})


export default router;