import Head from 'next/head'
import React,  { useState } from 'react';
import { Col, Row, Card, Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withProtected } from '../src/app/routes';
import { collection, query, where, getDoc, setDoc } from "firebase/firestore";
import { db } from "../src/firebase"


function Chats( {auth} ) {
const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
	  
}
export function withProtected(Chats)