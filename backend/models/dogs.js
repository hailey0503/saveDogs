import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const dogSchema = new Schema({
	name: String,
	contact: String,
	email: String,
	kakao: String,
	//photo: 
	airport: String,
	message: String
});

export default mongoose.model("Dog", dogSchema);