import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";



function Admin() {

	// register a dog to db in form submit 
  // call POST /dogs/register via fetch in handleSubmit
  
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <div className="Admin">
        <Form>
          <Row>
            <Col>
              <Form.Label>Dog Name</Form.Label>
              <Form.Control type="text" placeholder="name" />
          </Col>
          <Col>
              <Form.Label>Dog Photo</Form.Label>
              <Form.Control type="photo" placeholder="photo" /> 
          </Col>
        </Row>	
        <Row>
          <Col>
              <Form.Label>Contact</Form.Label>
              <Form.Control type="phonenumber" placeholder="number only" />	
          </Col>
          <Col>
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="name@example.com" />
            
          </Col>
        </Row>
        <Row>
          <Col>
              <Form.Label>Kakao ID</Form.Label>
              <Form.Control type="kakaoID" placeholder="ID" />	
          </Col>
          <Col>
              <Form.Label>Destination Airport</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Select Airport</option>
                  <option value="1">San Francisco</option>
                  <option value="2">New York</option>
                  <option value="3">Los Angeles</option>
                  <option value="4">Toronto</option>
                </Form.Select>
          </Col>
        </Row>	
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} />
          
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
