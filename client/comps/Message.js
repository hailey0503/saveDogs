import "./message.css";
import { useEffect, useState } from "react";
import { withProtected} from '../src/app/routes';
import { doc, onSnapshot } from "firebase/firestore";

function Message({auth, own}) {
 
	const { currentUser } = auth
	const [ chat , setChats ] = useState([])

	// use firebase snapshot to get realtime chat
	useEffect(() => {

	}, [])
	
	return (
		<div className={own ? "message own" : "message"}>
		<div className="messageTop">
			<img
			 className="messageImage"
			 src={
				"http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdog_9.77c974bd.jpeg&w=640&q=75"
			  }
				alt=""
			/>
			<p className="messageText">Declan Rice is new Arsenal number 41 </p>
		</div>

		<div className="messageBottom">1 hour ago</div>
		</div>
	);
  };
  
  export default withProtected(Message);
  