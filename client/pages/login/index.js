import Head from 'next/head'
//import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';


function Login() {
  return (
		<Stack gap={7} className="col-md-5 mx-auto">
			<Stack direction="horizontal" gap={2}>
				<Form.Group className="mb-3" controlId="login"></Form.Group>
				<Form.Label>Log In</Form.Label>
				<Form.Group className="mb-3 ms-auto" controlId="login"></Form.Group>
				<Form.Label>or Create Account</Form.Label>
			</Stack>
			<Form>
			<div className="d-grid gap-2">
				<Button variant="outline-success" size="lg">
					Continue with Google
				</Button>
				<Button variant="outline-primary" size="lg">
					Continue with Apple
				</Button>
			</div>
			<Form.Group className="mb-3" controlId="login"></Form.Group>
			<Form.Label>----------------------------------------    or   ---------------------------------------</Form.Label>
			</Form>
			<Form>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Email address</Form.Label>
					<Form.Control type="email" placeholder="Enter email" />
					<Form.Text className="text-muted">
					We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
					<Form.Text className="text-muted">
					Forgot your password?
					</Form.Text>
				</Form.Group>
				<Stack direction="horizontal" gap={2}>
				<Form.Group className="mb-3" controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Remember Me" />
				</Form.Group>
				<Button variant="primary" type="submit" className="mb-3 ms-auto">
					Submit
				</Button>
				</Stack>
			</Form>
		</Stack>
 
  );
}

export default Login;