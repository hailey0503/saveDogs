import Head from 'next/head'
import React,  { useState, useEffect } from 'react';
import { Col, Row, Card, Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import Link from 'next/link'
//import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withProtected } from '../../src/app/routes';
import Stack from 'react-bootstrap/Stack';



function myPage( {auth} ) {
	const [ error, setError ] = useState('');
  	const { currentUser, logOut } = auth;
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
			  <Navbar.Brand href="/">Dog Transportation</Navbar.Brand>
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
					  <Nav.Link href="/mypage">View my page</Nav.Link>
					  <Nav.Link href="/mydogs">Manage my dogs</Nav.Link>
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

			<Container>
				<div>
				<h2> { currentUser && <div>{currentUser.displayName? currentUser.displayName: currentUser.email}'s message</div> } </h2>
				</div>
			</Container>
		</>
	)
}

export default withProtected(myPage)