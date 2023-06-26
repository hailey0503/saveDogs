import Head from 'next/head'
import React from "react";
import styles from '../../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Nav, Navbar, Col, Row, Offcanvas, Container } from "react-bootstrap";
import { withProtected } from '../../src/app/routes';
import { useState } from 'react';
import { useRouter } from 'next/router';
import NavComp from "../../comps/NavComp.js";

function Admin({auth}) {
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
    const data = new FormData()
    data.append('name', event.target.name.value)
    data.append('contact', event.target.contact.value)
    data.append('email', event.target.email.value)
    data.append('kakao', event.target.address.value)
    data.append('airport', dest)
    data.append('message', event.target.message.value)
    data.append('testImage', event.target.image.files[0])
    data.append('uid', currentUser.uid)

    const token = await currentUser.getIdToken();
    console.log(token)
    console.log('data',data)

    console.log(event.target.image.files[0])

    // Send the data to the server in JSON format.
    //const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    //const endpoint = process.env.API_ENDPOINT
    const endpoint = "http://localhost:4800/dogs/register"
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
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
    alert(`successfully uploaded`)
    router.reload()

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
      <main className={styles.main}>
      <div className="Admin">
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Form.Label>Dog Name</Form.Label>
              <Form.Control type="text" id = "name" placeholder="name" />
          </Col>
          <Col>
              <Form.Label>Please upload photo here</Form.Label>
              <Form.Control type="file" id = 'image' multiple />
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
              <Form.Label>Address</Form.Label>
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
            upload
          </Button>
        
        </Form>
      </div>
    </main>
  </>
  );
}

export default withProtected(Admin);
