import { useState } from "react";
import { withProtected} from '../src/app/routes';
import "./conversation.css";
import { useChatAuth } from "../src/context/ChatContext";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../src/firebase";

function Input({auth}) {
 
  const { currentUser } = auth
  const { data } = useChatAuth()
  //console.log('dd',data.user)
  const [ text, setText ] = useState("")
  const [ img, setImg ] = useState(null)
  
 
  async function handleSend() {
	if (img) {

	} else {
		await updateDoc(doc(db, "chats", data.chatId), {
			messages: arrayUnion({
				id:
			})
		})
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
	  <img src={Attach} alt="" />
	  <input
		type="file"
		style={{ display: "none" }}
		id="file"
		onChange={(e) => setImg(e.target.files[0])}
	  />
	  <label htmlFor="file">
		<img src={Img} alt="" />
	  </label>
	  <button onClick={handleSend}>Send</button>
	</div>
  </div>
  );
};

export default withProtected(Input);
