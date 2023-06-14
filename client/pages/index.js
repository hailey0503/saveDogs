import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Form, Card, Container, Button, Nav, Navbar, Col, Row, Alert, Overlay, Popover } from 'react-bootstrap'
import { useAuth } from '../src/context/AuthContext'
import React, { useState, useRef } from 'react'
//import { useRouter } from 'next/navigation'
import { useRouter } from 'next/router';
import Link from 'next/link'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dog8 from "../public/dog_8.jpeg"
import Dog9 from "../public/dog_9.jpeg"
import Dog10 from "../public/dog_10.jpeg"
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import Swal from 'sweetalert2';
import 'animate.css';
import { BsChatDots } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { db } from "../src/firebase"
import { doc, getDoc } from "firebase/firestore";




const inter = Inter({ subsets: ['latin'] })
export const getServerSideProps = async (ctx) => {
  
  const res = await fetch('http://localhost:4800/dogs/');

  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const data = await res.json();
  
  console.log(data.result)

  return {

    props: { dogs : data }  

  }
  
}

export default function Home( {dogs} ) {
  const [ error, setError ] = useState('');
  const { currentUser, logOut } = useAuth();
  const router = useRouter();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [ favorites, setFavorite ] = useState([])
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [target, setTarget] = useState(null);
  const [ name, setName ] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  async function handleLogOut() {
  
    try {
  
      setError("")
      await logOut();
      console.log("you are logged out")
      return router.push("../login")
    } catch {
  
      setError("Failed to Log Out")
  
    }
  }

  
/*
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };


  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  

  const toggleChatWindow = () => {
    setIsChatOpen(!isChatOpen);
  };
*/
  async function openMsg(e, dog) {
      setShow(!show);
    	setTarget(e.target);
      console.log('dog owner id', dog.uid)
      const classRef = doc(db, "users", dog.uid);
      console.log('ref',classRef)
      const classSnap = await getDoc(classRef);
      console.log('doc',classSnap)

      console.log("Class data:", classSnap.data());
      console.log('target', target)
      setName(classSnap.data().displayName)

  }

  const handleSendMessage = (event, dog) => {
    event.preventDefault();
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };
  
  async function addFavorite(e, dogID) {
    e.preventDefault()
   
    if (!currentUser) {
      Swal.fire({title: 'please sign in first',
      icon: 'info',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      },
      footer: '<a href="../login">Sign in Here</a>'
    })
    } else {
      const {value, checked} = e.target
      if (checked) {
        const data = {
          uid: currentUser.uid,
          favorite: [dogID]
        }
  
        const token = await currentUser.getIdToken();
        const endpoint = "http://localhost:4800/userprofile"
      // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          //headers: {authorization: `Bearer ${token}`},
          // Body of the request is the JSON data we created above.
          headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          
        }
        console.log('107',data)
        // Send the form data to our forms API on Vercel and get a response.
        const response = await fetch(endpoint, options)

        // Get the response data from server as JSON.
        // If server returns the name submitted, that means the form works.
        const result = await response.json()
        console.log(result)
        alert(`successfully added to favorite`)
        //router.reload()
        //setFavorite(pre => [...pre, dogID])
      }
    }
  }
  console.log(favorites)

  return (
    
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="/">Dog Transportation</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-dark-example" />
              <Navbar.Collapse id="navbar-dark-example">
              </Navbar.Collapse>
              <Nav>
                
              <Nav.Item> 
                { currentUser? <Nav.Link href="../mypage">My Page</Nav.Link> :  <Nav.Link href="../login">Log In Here</Nav.Link> }
              </Nav.Item>
              </Nav>
          </Container>
        </Navbar>
      </nav>
      
      <main className={styles.main}>
        <div>
        <div className="Home">
          <Container>
            <Carousel>
              <Carousel.Item>
                <Image
                  style={{ height: '30rem'  }}
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
                  style={{ height: '30rem'  }}
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
                  style={{ height: '30rem'  }}
                  className="d-block w-100"
                  src={Dog10}
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

            <Container>
            <Form>
              <Row className="align-items-center">
                <Col xs= {5} md = {6}>
                  <Form.Select aria-label="Default select example" id = "airport">
                    <option>Select Airport</option>
                    <option value="1">San Francisco</option>
                    <option value="2">New York</option>
                    <option value="3">Los Angeles</option>
                    <option value="4">Toronto</option>
                    <option value="5">Vancouver</option>
                    <option value="6">Seattle</option>
                  </Form.Select>
                </Col>
              
                <Col xs = {3} md = {2}>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /> 
                </Col>
                <Col xs = {3} md = {2}>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} /> 
                </Col>
              
                <Col xs= {2}>
                <button className="btn btn-success" type="submit">Search</button>
                </Col>
              </Row>
            </Form>
            </Container>

            <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "100vh" }}>
              <Row style = {{ display: "flex", flexWrap: "wrap", gap: "12px"}}>
                {dogs.result && dogs.result.map(dog => 
                  <div key={dog._id} style = {{width: "fit-content"}}>
                    <Col style = {{width: "fit-content"}}>
                      <Card style={{ width: '20rem', height: '30rem' }}>
                    
                        <Card.Img variant="top" style={{ width: '20rem', height: '20rem'  }} src={" http://localhost:4800/" + dog.image } />
                        <Card.Body>
                          <Card.Title>
                            { dog.name }
                      
                            <FormControlLabel
                              control = {
                                <Checkbox
                                  icon = {<FavoriteBorderIcon />}
                                  checkedIcon = {<FavoriteIcon />}
                                  onChange=
                                  {e => addFavorite(e, dog._id)}
                                />
                              }
                              Label = "Like"
                            />
                            <div ref ={ref}>
                              <a onClick={ e => openMsg(e, dog) }><BsChatDots /></a>

                              <Overlay
                                show={show}
                                target={target}
                                placement="right"
                                container={ref}
                                containerPadding={20}
                              >
                                <Popover id="update-popover-contained">
                                <Popover.Body>
                                <Form onSubmit={e => handleSendMessage(e, dog)} >
                                  <Form.Label>Message to <a href= "../detail">{name}</a> </Form.Label>
                                  <Form.Control as="textarea" id = "message" rows={3} />
                                  <br/>
                                  <Button variant="primary" type="submit">
                                    send
                                  </Button>
                                  </Form>
                                  </Popover.Body>
                                </Popover>
                              </Overlay>
                            </div>

                            {!show && <a onClick={() => setShow(true)}><BsChatDots /></a>}
    
                           

                            <a href= "../detail"><BiDetail /> </a>
                            
                      
                        </Card.Title>
                          <Card.Text> 
                            { dog.name } wants to go to { dog.airport }
                          </Card.Text>
                         
                        </Card.Body>
                      </Card>
                    </Col>
                  </div>
                )}
              </Row>
            </Container>
          </Container>
        </div>
      </div>
    </main>
  </>
  )
}
