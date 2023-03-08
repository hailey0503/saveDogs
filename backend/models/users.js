import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
	name: String,
	email: String,
	//photo: 
	
});

export default mongoose.model("User", userSchema);