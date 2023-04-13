import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert, Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { withPublic } from '@/src/app/routes'; 


function Login ( {auth} ) {

	const emailRef = useRef()
	const passwordlRef = useRef()
	const { logIn } = auth
	
	const [ error, setError ] = useState('')
	const [ loading, setLoading ] = useState(false)
	const router = useRouter()
	
	const handleSubmit = async (e) => {
		e.preventDefault()
		
		try {
			setError('')
			setLoading(true)
			const { result, error } = await logIn(emailRef.current.value, passwordlRef.current.value)
			console.log("Success. The user is logged in")
			
		} catch {	
			setError('failed to sign in') 
		}
		//setLoading(false)
			
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
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Search</button>
              </form>
            </Nav>     
          </Navbar>
        </nav>
	

	<Container className = "d-flex align-items-center justify-content-center"
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
	</Container>
	</>
  );
}

export default withPublic(Login)