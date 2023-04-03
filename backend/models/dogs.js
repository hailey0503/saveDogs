import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const dogSchema = new Schema({
	name: {
		type: String,
		required: true
	},	
	contact: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	kakao: {
		type: String,
		required: true
	},
	image: {
		data: Buffer,
		contentType: String
	},
	airport: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});

export default mongoose.model("Dog", dogSchema);