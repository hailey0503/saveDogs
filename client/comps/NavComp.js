import { Navbar, Nav, Container, Offcanvas} from 'react-bootstrap';
import { useAuth } from '../src/context/AuthContext'
import { useState } from 'react';

const NavComp = () => {
	const { currentUser, logOut } = useAuth();
	const [ error, setError ] = useState('');

	async function handleLogOut() {
		try {
			console.log("clicked")
		  setError("")
		  console.log(error)
		  await logOut();
		} catch {
	
		  setError("Failed to Log Out")
	
		}
	  }
	return (
		<>
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
					{ currentUser && <div>Hello {currentUser.displayName? currentUser.displayName: currentUser.email}</div> }
					</Offcanvas.Title>
				  </Offcanvas.Header>
				  <Offcanvas.Body>
					<Nav className="justify-content-end flex-grow-1 pe-3">
					<Nav.Link href={"/mypage/" + currentUser.uid}>View my profile</Nav.Link>
					<Nav.Link href={"/admin/" + currentUser.uid}>Upload dogs</Nav.Link>
					<Nav.Link href={"/mydogs/" + currentUser.uid}>Manage my dogs</Nav.Link>
					<Nav.Link href={"../message/" + currentUser.uid}>My Message</Nav.Link>
					  <Nav.Item> 
						<Nav.Link onClick = { handleLogOut }>Log Out</Nav.Link>
					  </Nav.Item>
					</Nav>
				  </Offcanvas.Body>
				</Navbar.Offcanvas>
			  </Container>
			</Navbar>
		  ))}
		</>
	)

}
export default NavComp;