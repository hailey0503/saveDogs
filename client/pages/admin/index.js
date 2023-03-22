import Head from 'next/head'
import React from "react";
import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

function Admin() {

	// register a dog to db in form submit 
  // call POST /dogs/register via fetch in handleSubmit
  
  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()

    // Get data from the form.
    const data = {
      name: event.target.name.value,
      contact: event.target.contact.value,
      email: event.target.email.value,
      kakao: event.target.kakao.value,
      airport: event.target.airport.value,
      message: event.target.message.value,
    }

    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)

    // API endpoint where we send form data.
    const endpoint = 'http://localhost:4800/dogs/register'

    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: 'POST',
      // Tell the server we're sending JSON.
      headers: {
        'Content-Type': 'application/json',
      },
      // Body of the request is the JSON data we created above.
      body: JSONdata,
    }

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json()
    alert(`Is this your full name: ${result.data}`)
  }
  return (
    <>
      <main className={styles.main}>
      <div className="Admin">
        <Form>
          <Row>
            <Col>
              <Form.Label>Dog Name</Form.Label>
              <Form.Control type="text" id = "name" placeholder="name" />
          </Col>
          <Col>
              <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Please upload phoho here</Form.Label>
              <Form.Control type="file" multiple />
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
              <Form.Control type="kakaoID" id = "kakao" placeholder="ID" />	
          </Col>
          <Col>
              <Form.Label>Destination Airport</Form.Label>
                <Form.Select aria-label="Default select example" id = "airport">
                  <option>Select Airport</option>
                  <option value="1">San Francisco</option>
                  <option value="2">New York</option>
                  <option value="3">Los Angeles</option>
                  <option value="4">Toronto</option>
                </Form.Select>
          </Col>
        </Row>	
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" id = "message" rows={3} />
          <br/>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        
        </Form>
      </div>
    </main>
  </>
  );
}

export default Admin;
