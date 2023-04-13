import React,  { useState, useEffect } from 'react';
import { Button, Card, Alert, Navbar, Nav} from 'react-bootstrap';
import { useAuth } from '../../src/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import { withProtected } from '@/src/app/routes';
import { json } from 'react-router-dom';

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
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">My Page</h2> 
          { error && <Alert variant = "danger"> { error } </Alert> }
          { currentUser && <div>Congratulations {currentUser?.email}! You are logged in.</div>}
          <Link href= "../admin" className="btn btn-primary w-100 mt-3">
            Upload Dogs  
          </Link>
        </Card.Body>
      </Card>  
      <div className = "w-100 text-center mt-2">
        <Button variant="link" onClick = { handleLogOut }>Log Out</Button>
       
      </div>     
    </>
   
  )
}

export default withProtected(myPage)
