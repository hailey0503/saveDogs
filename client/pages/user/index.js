import Head from 'next/head'
import 'bootstrap/dist/css/bootstrap.min.css';

import { Form, Button, Card } from 'react-bootstrap'


function Users() {
  return (
    <container className = "d-flex align-items-center justify-content-center"
	  style = {{ minHeight: "100vh" }}>
    	<div className="Users">
        <Card>
          <Card.Body>
            <Form.Group controlId="formFileMultiple" className = "mb-4">
              <Form.Label>Please upload phoho here</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
        </Card.Body>
      </Card>
    	</div>
    </container>
  );
}

export default Users;