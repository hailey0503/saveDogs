import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userProfileSchema = new Schema({
	uid: {
		type:String,
		required: true
	},
	favorite: {
		type:Array,
		required: true
	}
	
});


export default mongoose.model("UserProfile", userProfileSchema);