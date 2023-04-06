import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/:filename', function (req, res, next) {
	var options = {
		root: path.join(__dirname, '../uploads'),
		dotfiles: 'deny',
		headers: {
		  'x-timestamp': Date.now(),
		  'x-sent': true
		}
	  }
	  console.log(req.params)
	  var fileName = req.params.filename
	  res.sendFile(fileName, options, function (err) {
		if (err) {
		  next(err)
		} else {
		  console.log('Sent:', fileName)
		}
	  })
})


export default router;