import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Carousel,
  Form,
  Card,
  Container,
  Button,
  Nav,
  Navbar,
  Col,
  Row,
  InputGroup,
  Overlay,
  Popover,
} from "react-bootstrap";
import { useAuth } from "../src/context/AuthContext";
import React, { useState, useRef, useEffect } from "react";
//import { useRouter } from 'next/navigation'
import { useRouter } from "next/router";
import Link from "next/link";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dog8 from "../public/dog_8.jpeg";
import Dog9 from "../public/dog_9.jpeg";
import Dog10 from "../public/dog_10.jpeg";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import Swal from "sweetalert2";
import "animate.css";
import { BsChatDots } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { db } from "../src/firebase";
import { v4 as uuid } from "uuid";
import {
  arrayUnion,
  Timestamp,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });
export const getServerSideProps = async (ctx) => {
  const res = await fetch("http://localhost:4800/dogs/");
  const res_profile = await fetch("http://localhost:4800/userprofile/");

  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await res.json();
  const user_data = await res_profile.json();

  console.log("index 47", data.result);
  console.log("index 48", user_data.result);

  return {
    props: { dogs: data, userprofile: user_data },
  };
};

export default function Home({ dogs, userprofile }) {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const setAirport = useRef(false);
  const [thisdogs, setThisDogs] = useState(dogs.result);

  localStorage.setItem("dogs", JSON.stringify(dogs));
  localStorage.setItem("userprofile", JSON.stringify(userprofile));

  async function handleLogOut() {
    try {
      setError("");
      await logOut();
      console.log("you are logged out");
      return router.push("../../login");
    } catch {
      setError("Failed to Log Out");
    }
  }
  async function handleSelect(e) {
    console.log("e", e);
    setValue(e.target.value);
    console.log("dest", value);
    setAirport.current = true;
  }

  useEffect(() => {
    if (setAirport.current) {
      console.log("dest", value);

      if (value === "1") {
        console.log("11");
        setThisDogs(
          dogs.result.filter((item) => item.airport === "San Francisco")
        );
        console.log("do1", thisdogs);
      } else if (value === "2") {
        console.log("22");
        setThisDogs(dogs.result.filter((item) => item.airport === "New York"));
        console.log("do2", dogs);
      } else if (value === "3") {
        console.log("33");
        setThisDogs(
          dogs.result.filter((item) => item.airport === "Los Angeles")
        );
      } else if (value === "4") {
        console.log("22");
        setThisDogs(dogs.result.filter((item) => item.airport === "Toronto"));
      } else if (value === "5") {
        console.log("22");
        setThisDogs(dogs.result.filter((item) => item.airport === "Vancouver"));
      } else if (value === "6") {
        console.log("22");
        setThisDogs(dogs.result.filter((item) => item.airport === "Seattle"));
      } else {
        setThisDogs(dogs.result);
      }
      setAirport.current = false;
    }
  }, [value]);

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
        setName(classSnap.data().displayName);
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
    setNewMessage(event.target.message.value);
    console.log('new msg', newMessage)
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
        displayName: name,
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
    await updateDoc(doc(db, "chats", combinedId), {
      messages: arrayUnion({
        id: uuid(),
        text: event.target.message.value,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      }),
    });
    console.log([combinedId + ".userInfo"]);
    console.log("end of update");

    
    console.log(event.target.message.value);
    console.log(newMessage);
    //setNewMessage('');
    setUser(null);
    setName("");
    setShow(false);
  }

  async function addFavorite(e, dogID) {
    e.preventDefault();

    if (!currentUser) {
      Swal.fire({
        title: "please sign in first",
        icon: "info",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
        footer: '<a href="../login">Sign in Here</a>',
      });
    } else {
      const userFavorite = userprofile.result.filter(
        (item) => item.uid === currentUser.uid
      )[0].favorite;

      console.log("234", userFavorite);
      console.log("235", userFavorite.includes(dogID));
      const { value, checked } = e.target;
      if (checked) {
        if (!userFavorite.includes(dogID)) {
          const data = {
            uid: currentUser.uid,
            favorite: [dogID],
          };

          const token = await currentUser.getIdToken();
          const endpoint = "http://localhost:4800/userprofile";
          // Form the request for sending data to the server.
          const options = {
            // The method is POST because we are sending data.
            method: "POST",
            // Tell the server we're sending JSON.
            //headers: {authorization: `Bearer ${token}`},
            // Body of the request is the JSON data we created above.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          };
          console.log("107", data);
          // Send the form data to our forms API on Vercel and get a response.
          const response = await fetch(endpoint, options);

          // Get the response data from server as JSON.
          // If server returns the name submitted, that means the form works.
          const result = await response.json();
          console.log(result);
          alert(`successfully added to favorite`);
          //router.reload()
          //setFavorite(pre => [...pre, dogID])
        } else {
          alert(`you already favorited this dog!`);
        }
      }
    }
  }
  const handleOverlayClose = () => {
    setShow(false);
  };


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar className="navbar" variant="dark">
          <Container fluid>
            <Navbar.Brand href="/">Dog Transportation</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-dark-example" />
            <Navbar.Collapse id="navbar-dark-example"></Navbar.Collapse>
            <Nav>
              <Nav.Item>
                {currentUser ? (
                  <Nav.Link href={"../mypage/" + currentUser.uid}>
                    My Page
                  </Nav.Link>
                ) : (
                  <Nav.Link href="../login">Log In Here</Nav.Link>
                )}
              </Nav.Item>
            </Nav>
          </Container>
        </Navbar>
      </nav>

      <main className={styles.main}>
        <div className={styles.homeContainer}>
          <div className="Home">
            <Carousel style={{ paddingBottom: 30 }}>
              <Carousel.Item>
                <Image
                  style={{ height: "30rem" }}
                  className="d-block w-100"
                  src={Dog8}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Dog Transport</h3>
                  <p>Help Dogs to Meet New Family</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  style={{ height: "30rem" }}
                  className="d-block w-100"
                  src={Dog9}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Travel with dogs</h3>
                  <p>Dogs Travel with You</p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <Image
                  style={{ height: "30rem" }}
                  className="d-block w-100"
                  src={Dog10}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

            <Container>
              <Container className="fileter" style={{ paddingBottom: 20 }}>
                <Form>
                  <Row className="align-items-center">
                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Select
                          aria-label="Default select example"
                          id="airport"
                          onChange={(e) => handleSelect(e)}
                        >
                          <option value="0">search by destination</option>
                          <option value="1">San Francisco</option>
                          <option value="2">New York</option>
                          <option value="3">Los Angeles</option>
                          <option value="4">Toronto</option>``
                          <option value="5">Vancouver</option>
                          <option value="6">Seattle</option>
                        </Form.Select>
                      </InputGroup>
                    </Col>

                    <Col>
                      <InputGroup className="mb-3">
                        <Form.Control
                          placeholder="Search shelter location"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <Button variant="outline-secondary" id="button-addon2">
                          Search
                        </Button>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form>
              </Container>

              <Container
                className="d-flex align-items-center justify-content-center"
                style={{ minHeight: "100vh" }}
              >
                <Row
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "40px",
                    width: "80rem",
                    paddingLeft: "2.5rem",
                  }}
                >
                  {thisdogs &&
                    thisdogs.map((dog) => (
                      <div key={dog._id} style={{ width: "fit-content" }}>
                        <Col style={{ width: "fit-content" }}>
                          <Card style={{ width: "20rem", height: "30rem" }}>
                            <Card.Img
                              variant="top"
                              style={{ width: "19.9rem", height: "18rem" }}
                              src={" http://localhost:4800/" + dog.image}
                            />
                            <Card.Body
                              style={{
                                width: "20rem",
                                height: "12rem",
                                padding: 10,
                                paddingBottom: 15,
                              }}
                            >
                              <Card.Title
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  paddingTop: 5,
                                }}
                              >
                                {dog.name}

                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      icon={<FavoriteBorderIcon />}
                                      checkedIcon={<FavoriteIcon />}
                                      onChange={(e) => addFavorite(e, dog._id)}
                                    />
                                  }
                                  Label="Like"
                                  style={{ paddingLeft: 10 }}
                                />
                                <div style={{padding:"8px 11px 11px"}} ref={ref}>
                                  <a onClick={(e) => openMsg(e, dog)}>
                                    <BsChatDots />
                                  </a>

                                  <Overlay
                                    show={show}
                                    target={target}
                                    placement="right"
                                    container={ref}
                                    containerPadding={10}
                                    onHide={handleOverlayClose}
                                    rootClose
                                   >
                                  
                                    <Popover id="update-popover-contained">
                                      <Popover.Body>
                                        <Form
                                          onSubmit={(e) =>
                                            handleSendMessage(e, dog)
                                          }
                                        >
                                          <Form.Label
                                            style={{ color: "#3A98B9" }}
                                          >
                                            Message to{" "}
                                            <a
                                              href="../detail"
                                              style={{ color: "#E8D5C4" }}
                                            >
                                              {name}
                                            </a>{" "}
                                          </Form.Label>
                                          <Form.Control
                                            as="textarea"
                                            id="message"
                                            rows={6}
                                            cols = {80}
                                           
                                            onClick={(e)=>{e.stopPropagation()} }
                                          />
                                        <br />
                                          <Button
                                            variant="primary"
                                            type="submit"
                                          >
                                            Send
                                          </Button>
                                        </Form>
                                      </Popover.Body>
                                    </Popover>
                                   
                                  </Overlay>
                                </div>
                              </Card.Title>
                              <div
                                className="cardMessageandButton"
                                style={{ alignItems: "center", height: "7rem" }}
                              >
                                <Card.Text
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "3.5em",
                                  }}
                                >
                                  {dog.name} wants to go to {dog.airport}
                                </Card.Text>
                                <Link
                                  href={{
                                    pathname: `../detail/${dog._id}`,
                                    query: {
                                      dog: dog._id,
                                    }, // the data
                                  }}
                                  className="btn btn-primary "
                                >
                                  click for detail
                                </Link>
                              </div>
                            </Card.Body>
                          </Card>
                        </Col>
                      </div>
                    ))}
                </Row>
              </Container>
            </Container>
          </div>
        </div>
      </main>
    </>
  );
}
