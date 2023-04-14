import Head from 'next/head'
import React, { useRef, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, Card, Alert, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
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
		 <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar bg="dark" variant="dark">
            <Container fluid>
              <Navbar.Brand href="#home">Dog Transportation</Navbar.Brand>
              <Navbar.Toggle aria-controls="navbar-dark-example" />
              <Navbar.Collapse id="navbar-dark-example">
                <Nav>
                  <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Menu"
                    menuVariant="dark"
                    //className="ml-auto"
                  >
                    <NavDropdown.Item href="/">Home</NavDropdown.Item>
                    <NavDropdown.Item href="../mypage">My Page</NavDropdown.Item>
                    <NavDropdown.Item href="../register">Log out</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="../login" >Log In</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
          </Container>
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