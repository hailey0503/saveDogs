import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


function Users() {
  return (
    <div>
    	<div className="Users">
		<Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Please upload phoho here</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
    	</div>
    </div>
  );
}

export default Users;