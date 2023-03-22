import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert, Stack } from 'react-bootstrap'
import { useAuth } from '../../src/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function Login() {

	const emailRef = useRef()
	const passwordlRef = useRef()
	const { logIn } = useAuth()
	const [ error, setError ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		try {
			setError('')
			setLoading(true)
			await logIn(emailRef.current.value, passwordlRef.current.value)
			return router.push("../mypage")
		} catch {	
			setError('failed to sign in') 
		}
		setLoading(false)
			
	}
	
  return (

	<container className = "d-flex align-items-center justify-content-center"
	style = {{ minHeight: "100vh" }}>
	<div className = "w-100" style = {{ maxWidth: '400px'}}>
		<Card>
			<Card.Body>
				<h2 className = "text-center mb-4">Log In</h2> 
				{ error && <Alert variant = "danger"> { error } </Alert> }
				<Form onSubmit={handleSubmit}>
					<Form.Group id = "email">
						<Form.Label> Email </Form.Label>
						<Form.Control type = "email" ref = {emailRef} required />
					</Form.Group>
					<br />
					<Form.Group id = "password">
						<Form.Label> Password </Form.Label>
						<Form.Control type = "password" ref = {passwordlRef} required />
						<Form.Text className="text-muted">
						<Link href="../login/index">Forgot your password?</Link>
						</Form.Text>
					</Form.Group>		
					<br/ >
					<Button disabled = { loading }  className = "w-100" type = "submit">Log In</Button>
				</Form>
				<div className = "w-100 text-center mt-2">
					Don't have an account? <Link href="../register">Sign Up</Link> 
				</div>
			</Card.Body>
		</Card>
	</div>
	</container>
  );
}

export default Login;