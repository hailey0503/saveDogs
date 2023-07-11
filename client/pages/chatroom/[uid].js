import Head from "next/head";
import "./chatroom.css";
import React, { useState, useEffect } from "react";
import { Col, Row, Card, Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
import { withProtected } from "../../src/app/routes";
import { collection, query, where, getDoc, setDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../src/firebase";
import NavComp from "../../comps/NavComp.js";
import Message from "../../comps/Message.js";
import Conversation from "../../comps/Conversation.js";
import Search from "../../comps/search.js";
import { useChatAuth } from "../../src/context/ChatContext";

function Chatroom({ auth }) {
  const [error, setError] = useState("");
  const { currentUser, logOut } = auth;
  const { data } = useChatAuth()
  const [ userName, setUserName] = useState("");
  const [ user, setUser] = useState(null);
  const [ messages, setMessages ] =useState([])

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", data.chatId), (doc) => {
        console.log("currnet data: ", doc.data());
        doc.exists() && setMessages(doc.data().messages);
      });
      return () => {
        unsub();
      };
    };
   
  }, [data]);

  console.log("msgs", Object.entries(messages));

 
  //search an user
  async function handleSearch() {
    const q = query(
      collection(db, "users"),
      where("diaplayName", "==", userName)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      setError(true);
    }
  }
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    //combime both user's ids
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    console.log("id", combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      // no chat b/w two ppl
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            //photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        // for opponent user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            //photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {}
    // unclick opponent user by clicking it
    setUser(null);
    //delete name in search bar
    setUserName("");
  };

  async function openMsg(e, dog) {
    setShow(!show);
    setTarget(e.target);
    console.log("cur user id", currentUser.uid);
    //const classRef = doc(db, "users", dog.uid);
    //console.log('ref',classRef)
    if (currentUser.uid != dog.uid) {
      const classSnap = await getDoc(doc(db, "users", dog.uid));
      if (classSnap.exists()) {
        // console.log("Document data:", docSnap.data())
        setUser(classSnap.data());
        setUserName(classSnap.data().displayName);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    } else {
      console.log("same user!");
      alert("can't message to yourself");
      setShow(false);
    }
  }

  async function handleSendMessage(event, dog) {
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
        uid: currentUser.uid,
        displayName: currentUser.displayName,
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

    setNewMessage(event.target.message.value);
    console.log(event.target.message.value);
    console.log(newMessage);
    //setNewMessage('');
    setUser(null);
    setUserName("");
    setShow(false);
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavComp />

      <Container style={{ minHeight: "100vh" }}>
        <div className="chatDisplayName" style={{ padding: 10 }}>
          <h2>
            {" "}
            {currentUser && (
              <div className="username">
                {currentUser.displayName
                  ? currentUser.displayName
                  : currentUser.email}
                's chat
              </div>
            )}{" "}
          </h2>
        </div>
        <div className="chat">
          <div className="chatMenu">
            <div className="chatMenuWrap">
              <Search />
              <Conversation />
             
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrap">
              <div className="chatBoxTop">
				{messages.map((m)=>(
					<Message message={m} key={m.id}/>
				))}
				<Message />
               
              </div>
              <div className="chatBoxBottem">
                <textarea
                  className="chatMessageInput"
                  placeholder="write here"
                ></textarea>
                <button className="chatSubmitButton">Send</button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default withProtected(Chatroom);
