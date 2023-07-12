import { useState } from "react";
import { withProtected} from '../src/app/routes';
import "./conversation.css";
import { useChatAuth } from "../src/context/ChatContext";
import { arrayUnion, updateDoc, doc, Timestamp,  serverTimestamp } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db } from "../src/firebase";

function Input({auth, combinedId, user, getChats}) {
 
  const { currentUser } = auth
  const { data } = useChatAuth()
  const [ text, setText ] = useState("")
  const [ img, setImg ] = useState(null)
  
 console.log('c',combinedId)
 console.log('u',user)

  async function handleSend() {
	console.log('handlesend')
	if (img) {

	} else {
		await updateDoc(doc(db, "userChats", currentUser.uid), {
     
			[combinedId + ".userInfo"]: {
			  uid: user.uid,
			  displayName: user.displayName,
			  //photoURL: user.photoURL,
			},
			[combinedId + ".date"]: serverTimestamp(),
		  });
		  await updateDoc(doc(db, "userChats", user.uid), {
			[combinedId + ".userInfo"]: {
			  uid: currentUser.uid,
			  displayName: currentUser.displayName,
			  //photoURL: currentUser.photoURL,
			},
			[combinedId + ".date"]: serverTimestamp(),
		  });
		await updateDoc(doc(db, "chats", combinedId), {
			messages: arrayUnion({
			  id: uuid(),
			  text: text,
			  senderId: currentUser.uid,
			  date: Timestamp.now()
			}),
		  });
		console.log('updateDoc 29')
		getChats(combinedId)
	}
    };
	

  return (
	<div className="input">
	<input
	  type="text"
	  placeholder="Type something..."
	  onChange={(e) => setText(e.target.value)}
	  value={text}
	/>
	<div className="send">
	  <img src={""} alt="" />
	  <input
		type="file"
		style={{ display: "none" }}
		id="file"
		onChange={(e) => setImg(e.target.files[0])}
	  />
	  <label htmlFor="file">
		<img src={""} alt="" />
	  </label>
	  <button onClick={handleSend}>Send</button>
	</div>
  </div>
  );
};

export default withProtected(Input);
