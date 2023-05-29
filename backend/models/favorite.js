import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const favoriteSchema = new Schema({
	uid: {
		type:String,
		required: true
	},
	dogId: {
		type:String,
		required: true
	}
	
});


export default mongoose.model("Favorite", favoriteSchema);