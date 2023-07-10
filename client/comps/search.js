import Head from 'next/head'
import React,  { useState } from 'react';
import { Col, Row, Card, Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withProtected } from '../src/app/routes';
import { collection, query, where, getDocs, setDoc, getDoc, updateDoc, doc, serverTimestamp, QuerySnapshot } from "firebase/firestore";
import { db } from "../src/firebase"

function Search( {auth} ) {
	const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = auth;

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    console.log('username', username)
    console.log('q',q)

    try {
      console.log('user', user)
      const querySnapshot = await getDocs(q);
      console.log('query',querySnapshot)
      await querySnapshot.forEach((doc) => { //setuser is too late!
        console.log('userdoc', doc.data())
        setUser(doc.data());
        console.log('user', user)
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

 
  console.log('displayname', currentUser.displayName)
  async function handleSelect(event) {
    event.preventDefault();
    console.log("114", user);
    //combime both user's ids
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("id", combinedId);
    //check if there is a chat between these users
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        console.log("lalala");
        //create a chat between two users
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }
    } catch (err) {}
    //add to userChats
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
    console.log([combinedId + ".userInfo"]);
    console.log("end of update");

    //setNewMessage(event.target.message.value);
    //console.log(event.target.message.value);
    //console.log(newMessage);
    //setNewMessage('');
    //setNewMessage('');
    setUser(null);
   // setUserName("");
   // setShow(false);
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && 
        <div className="userChat" onClick={(e) =>
                                            handleSelect(e)
                                          }>
          <div className="userChatInfo" style = {{paddingTop: "15px", paddingLeft: "5px"}}>
            <img
              className='userChatImage'
              src = {"data:image/jpeg;base64,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"}
              alt = ""
              />
            <span className = 'opponentUser' style = {{color: "#3A98B9"}}>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  );

}
export default withProtected(Search)