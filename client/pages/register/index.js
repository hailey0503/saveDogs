import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../../src/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


function Register() {
	const emailRef = useRef()
	const passwordlRef = useRef()
	const passwordConfirmRef = useRef()
	const { signUp } = useAuth()
	const [ error, setError ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const router = useRouter()

	const handleSubmit = async (e) => {
		e.preventDefault()
		
		if (passwordlRef.current.value != passwordConfirmRef.current.value) {
			return setError('PASSWORD DO NOT MATCH')
		}
		if (passwordlRef.current.value.length < 7) {
			return setError('PASSWORD SHOULD BE LONGER THAN 6 CHARACTERS')
		}
		
		try {
			setError('')
			setLoading(true) 
			const { result, error } = await signUp(emailRef.current.value, passwordlRef.current.value)
			// you have successfully signed up. now log in
			console.log("Success. The user is created in firebase")
			return router.push("../login")
			
		} catch {
	
			setError('failed to create an account') 
		}

		setLoading(false)
		
	}

  return (
	<>
		<nav>
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">Dog Transportation</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="../register">Sign Up</Nav.Link>
              <Nav.Link href="../login" >Log In</Nav.Link>
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </Nav>     
          </Navbar>
        </nav>
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
						Already have an account? <Link href="../login/">Log In</Link>
					</div>
				</Card.Body>
			</Card>
		</div>
	</container>
	</>
  )
}

export default Register