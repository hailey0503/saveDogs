import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import CardColumns from 'react-bootstrap/CardColumns'
import Carousel from 'react-bootstrap/Carousel'
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";




function Admin() {

	// register a dog to db in form submit 
	// call POST /dogs/register via fetch in handleSubmit
	

  return (
    <div>
    {/* <img src={Dog} alt="website logo" /> */}
      <div className="Admin">
        
	  <Form>
	  	<Form.Row>
    		<Col>
				
					<Form.Label>Dog Name</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
			<Col>
				
					<Form.Label>Shelter Name</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
		</Form.Row>	
		<Form.Row>
			<Col>
				
					<Form.Label>Contact</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
			<Col>
				
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
		</Form.Row>
		<Form.Row>
			<Col>
				
					<Form.Label>Kakao ID</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
			<Col>
				
					<Form.Label>Destination Airport</Form.Label>
					<Form.Control type="email" placeholder="name@example.com" />
				
			</Col>
		</Form.Row>	

			<Form.Label>Message</Form.Label>
			<Form.Control as="textarea" rows={3} />
			<Button variant="primary" type="submit">
				Submit
			</Button>
		</Form>
      </div>
    </div>
  );
}

export default Admin;
