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
		type: String,
		required: true
	},
	
	airport: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	uid: {
		type:String,
		required: true
	}
});

export default mongoose.model("Dog", dogSchema);