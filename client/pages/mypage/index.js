import Head from 'next/head'
import React,  { useState } from 'react';
import { Col, Row, Card, Alert, Navbar, Nav, NavDropdown, Container, Offcanvas } from 'react-bootstrap';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withProtected } from '../../src/app/routes';


function myPage( {auth} ) {

  const [ error, setError ] = useState('')
  const { currentUser, logOut } = auth;
  const router = useRouter()

  async function handleLogOut() {
  
    try {

      setError("")
      await logOut();
    } catch {

      setError("Failed to Log Out")

    }
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {[false].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} className="mb-3">
          <Container fluid>
          <Navbar.Brand href="#home">Dog Transportation</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
               
                { currentUser && <div>{currentUser.displayName? currentUser.displayName: currentUser.email}</div> }
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/">View my profile</Nav.Link>
                  <Nav.Link href="/admin">Upload dogs</Nav.Link>
                  <Nav.Link href="/admin">Manage my dogs</Nav.Link>
                  <Nav.Link href="../message">My Message</Nav.Link>
                  <Nav.Item> 
                    <Nav.Link onClick = { handleLogOut }>Log Out</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <h2> { currentUser && <div>{currentUser.displayName? currentUser.displayName: currentUser.email}'s page</div> } </h2>
      <h3>Dogs to travel</h3>
      <Container className = "d-flex align-items-center justify-content-center"
	style = {{ minHeight: "100vh" }}>
      <div className = "w-100" style = {{ maxWidth: '400px'}}>
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">My Page</h2> 
          { error && <Alert variant = "danger"> { error } </Alert> }
          { currentUser && <div>Congratulations! You are logged in.</div>}
          <p>You have not uploaded any dogs yet</p>
          <Link href= "../admin" className="btn btn-primary w-100 mt-3">
            Go Upload Dogs  
          </Link>
        </Card.Body>
      </Card>  
      </div>
      </Container>  
    </>
   
  )
}

export default withProtected(myPage)
