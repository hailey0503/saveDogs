import { useEffect, useState } from "react";
import { withProtected } from "../src/app/routes";
import "./conversation.css";
import { useChatAuth } from "../src/context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase";

function Conversation({ auth, getChats, setUser, setCombinedId }) {
  const { currentUser } = auth;
  //const { data } = useChatAuth();
  const [chats, setChats] = useState({});



  useEffect(() => { //this lists the friends names
    const fetchChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        console.log("currnet data: ", doc.data());
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && fetchChats();
  }, [currentUser.uid]);

  console.log("chats", Object.entries(chats));

  const handleSelect = (user) => {
    setUser(user)
    const combinedId =
    currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
    console.log("id", combinedId);
    setCombinedId(combinedId)
    getChats(combinedId)
  };

  return (
    <div>
      {Object.entries(chats)?.map((chat) => (
      
        <div className="conversation"
             key={chat[1].userInfo.uid} >
          <div
            className="conversationChoice"
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img
              className="conversationImg"
              src={
                "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdog_9.77c974bd.jpeg&w=640&q=75"
              }
              alt=""
            />

            <span className="conversationName">
              {chat[1].userInfo.displayName}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withProtected(Conversation);
