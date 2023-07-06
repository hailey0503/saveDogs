import { useMemo } from "react";
import { withProtected} from '../src/app/routes';
import "./conversation.css";

function Conversation({auth}) {
 
  const { currentUser } = auth
  
  return (
    <div className="conversation">
   
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
