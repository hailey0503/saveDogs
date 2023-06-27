import Head from 'next/head'
import React from "react";
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Nav, Navbar, Col, Row, Offcanvas, Container } from "react-bootstrap";
import { withProtected } from '../../src/app/routes';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
//import Popup from './components/Popup';

function Admin({auth}) {
  const [ error, setError ] = useState('')
  //const [ buttonPopup, setButtonPopup  ] = useState(false)
  const { currentUser, logOut } = auth;
  const router = useRouter()

	// register a dog to db in form submit 
  // call POST /dogs/register via fetch in handleSubmit
  
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    console.log( event.target.image.files[0])
    // Get data from the form.
    let dest = ""
    if (event.target.airport.value === '1') {
      dest = "San Francisco"
    }
    if (event.target.airport.value === '2') {
      dest = "New York"
    }
    if (event.target.airport.value === '3') {
      dest = "Los Angeles"
    }
    if (event.target.airport.value === '4') {
      dest = "Toronto"
    }
    if (event.target.airport.value === '5') {
      dest = "Vancouver"
    }
    if (event.target.airport.value === '6') {
      dest = "Seattle"
    }

    // Get data from the form.
    const data = new FormData()
    data.append('name', event.target.name.value)
    data.append('contact', event.target.contact.value)
    data.append('email', event.target.email.value)
    data.append('address', event.target.address.value)
    data.append('airport', dest)
    data.append('message', event.target.message.value)
    data.append('testImage', event.target.image.files[0])
    data.append('uid', currentUser.uid)

    const token = await currentUser.getIdToken();
    console.log(token)

    console.log(data.testImage)
    console.log(event.target.image)

    // Send the data to the server in JSON format.
    //const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    //const endpoint = process.env.API_ENDPOINT
    const endpoint = "http://localhost:4800/users/{currentUser.uid}" //how to get id from this dog?
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'PUT',
      // Tell the server we're sending JSON.
      /*
      headers: {
        //'Content-Type': 'multipart/form-data',
        authtoken: token 
      },
      */
      headers: {authorization: `Bearer ${token}`},
      // Body of the request is the JSON data we created above.
      body: data,
       
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    //alert(`Is this your full name: ${result.body}`)
    //alert(`successfully uploaded`)
	router.push('./mydogs')

  }

  async function handleLogOut() {
  
    try {

      setError("")
      await logOut();
    } catch {

      setError("Failed to Log Out")

    }
  }
  return (
    <>
       <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
          <Navbar.Brand href="/">Dog Transportation</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
               
                { currentUser && <div>{currentUser.displayName? currentUser.displayName: currentUser.email}</div> }
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/mypage">View my page</Nav.Link>
                  <Nav.Link href="/admin">Upload dogs</Nav.Link>
                  <Nav.Link href="/mydogs">Manage my dogs</Nav.Link>
                  <Nav.Link href="../message">My Message</Nav.Link>
                  <Nav.Item> 
                    <Nav.Link onClick = { handleLogOut }>Log Out</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      
      <main className={styles.main}>
      <div className="Admin">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Dog Name</Form.Label>
              <Form.Control type="text" id = "name" placeholder="name" />
          </Col>
          <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Please upload photo here</Form.Label>
              <Form.Control type="file" id = 'image' multiple />
              </Form.Group>
          </Col>
        </Row>	
        <Row>
          <Col>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="phonenumber" id = "contact" placeholder="number only" />	
          </Col>
          <Col>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" id = "email" placeholder="name@example.com" />
            
          </Col>
        </Row>
        <Row>
          <Col>
              <Form.Label>Kakao ID</Form.Label>
              <Form.Control type="address" id = "address" placeholder="your address" />	
          </Col>
          <Col>
              <Form.Label>Destination Airport</Form.Label>
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
        </Row>	
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" id = "message" rows={3} />
          <br/>
          <Button variant="primary" type="submit">
            update
          </Button>
        
        </Form>
      </div>
    </main>
  </>
  );
}

export default withProtected(Admin);
