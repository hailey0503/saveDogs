import { useMemo } from "react";
import { withProtected} from '../src/app/routes';
import "./conversation.css";
import { useChatAuth } from "../src/context/ChatContext";

function Conversation({auth}) {
 
  const { currentUser } = auth
  const { data } = useChatAuth()
  //console.log('dd',data.user)
 
  const handleSelect = (user) => {
    dispatch({type: CHANGE_USER, payload: user})
    };

  return (
    <div className="conversation"  onClick = {()=> handleSelect(chat[1].userInfo)}>
   
    <img
      className="conversationImg"
      
      src={
        "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdog_9.77c974bd.jpeg&w=640&q=75"
      }
      
      alt=""
    />
   
    <span className="conversationName">{currentUser?.displayName}</span>
  </div>
  );
};

export default withProtected(Conversation);
