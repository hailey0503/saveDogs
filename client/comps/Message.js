import "./message.css";
import { useContext, useEffect, useState } from "react";
import { withProtected } from "../src/app/routes";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase";
import { useChatAuth } from "../src/context/ChatContext";

function Message({ auth, own, message }) {
  const { currentUser } = auth;
  const { data } = useChatAuth()
  const [chats, setChats] = useState([]);
  console.log('me', message)
  
  
  // use firebase snapshot to get realtime chat
  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log("currnet data: ", doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log("chats", Object.entries(chats));

  const handleSelect = (user) => {
	dispatch({type: CHANGE_USER, payload: user})
  };

  return (
    <div className="chats">
      <div className={own ? "message own" : "message"}>
        {Object.entries(chats)?.map((chat) => (
          <div
            className="messageTop"
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
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

            <div className="messageBottom">date</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withProtected(Message);
