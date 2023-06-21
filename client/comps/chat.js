import React, { useContext } from "react";
//import Messages from "./Messages";
//import Input from "./Input";
//import { ChatContext } from "../context/ChatContext";
import { withProtected } from '../src/app/routes';

function Chat({auth}) {
  //const { data } = useContext(ChatContext);
  const { currentUser } = auth

  return (
    <div className="chat">
      <div className="chatInfo">
        
		<span>{currentUser.displayName}</span>
        <div className="chatIcons">
          <p>deer</p>
		  <p>bear</p>
        </div>
      </div>
     
    </div>
  );
};

export default withProtected(Chat);