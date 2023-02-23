import Head from 'next/head'
//import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


function Register() {
  return (
		<Stack gap={7} className="col-md-5 mx-auto">
			<Stack direction="horizontal" gap={2}>
				<Form.Group className="mb-3" controlId="login"></Form.Group>
				<Form.Label>Create an account</Form.Label>
				<Form.Group className="mb-3 ms-auto" controlId="login"></Form.Group>
				<Form.Label>or login</Form.Label>
			</Stack>
			
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>First name</Form.Label>
					<Form.Control type="text" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Last name</Form.Label>
					<Form.Control type="text" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" />
					<Form.Text className="text-muted">
					We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" />
				</Form.Group>

				<Stack direction="horizontal" gap={2}>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="I agree to the Terms" />
				</Form.Group>
				<Button variant="primary" type="submit" className="mb-3 ms-auto">
					Create an account
				</Button>
				</Stack>
			</Form>
		</Stack>
 
  );
}

export default Register;