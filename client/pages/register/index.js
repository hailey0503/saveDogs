import Head from 'next/head'
import React, { useRef, useState } from 'react'
//import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../../src/AuthContext'


function Register() {
	const emailRef = useRef()
	const passwordlRef = useRef()
	const passwordConfirmRef = useRef()
	const { signUp } = useAuth()
	const [ error, setError ] = useState('')
	const [ loading, setLoading ] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		if (passwordlRef.current.value != passwordConfirmRef.current.value) {
			return setError('PASSWORD DO NOT MATCH')
		}
	
		try {
			setError('')
			setLoading(true)
			await signUp(emailRef.current.value, passwordlRef.current.value)
		} catch(error) {
			console.error(error)
			setError('failed to create an account') 
		}
		setLoading(false)
	}

  return (
		<container className = "d-flex align-items-center justify-content-center"
			style = {{ minHeight: "100vh" }}>
		<div className = "w-100" style = {{ maxWidth: '400px'}}>
			<Card>
				<Card.Body>
					<h2 className = "text-center mb-4">Sign Up</h2> 
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
						</Form.Group>
						<br />
						<Form.Group id = "passwordConfirm">
							<Form.Label> Confirm Password </Form.Label>
							<Form.Control type = "password" ref = {passwordConfirmRef} required />
						</Form.Group>
						<br/ >
						<Button disabled = { loading }  className = "w-100" type = "submit">Sign Up</Button>
					</Form>
					<div className = "w-100 text-center mt-2">
						Already have an account? Log In
					</div>
				</Card.Body>
			</Card>
			
		</div>
		
		
	</container>
  )
}

export default Register