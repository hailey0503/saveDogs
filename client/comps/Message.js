import "./message.css";
import { useEffect, useState } from "react";
import { withProtected} from '../src/app/routes';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase"

function Message({auth, own}) {
 
	const { currentUser } = auth
	const [ chats , setChats ] = useState([])

	// use firebase snapshot to get realtime chat
	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
				console.log("currnet data: ", doc.data());
				setChats(doc.data())
			})
			return  () => {
				unsub();
			}

		}
		currentUser.uid && getChats()
	}, [currentUser.uid])

	console.log('chats', Object.entries(chats))

	return (
		<div className="chats">
			{Object.entries(chats)?.map((chat) => (
				<div className="messageTop" key={chat[0]}>
				<img
				 className="messageImage"
				 src={
					"http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdog_9.77c974bd.jpeg&w=640&q=75"
				  }
					alt=""
				/>
				<div className="messageText">
					<span>{chat[1].userInfo.displayName}</span>
					<p>{chat[1].userInfo.lastMessage?.text}</p>
				</div>
	
				<div className="messageBottom">{chat[1].date.seconds}</div>
		
		</div>
			))}
			</div>
		
	);
	
  };
  
  export default withProtected(Message);
  