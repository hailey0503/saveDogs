import React,  { useState } from 'react';
import { Button, Card, Alert} from 'react-bootstrap';
import { useAuth } from '../../src/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function myPage() {

  const [ error, setError ] = useState('')
  const { currentUser, logOut } = useAuth()
  const router = useRouter()

  async function handleLogOut() {
  
    try {

      setError("")
      await logOut();
      router.push("../login")

    } catch {

      setError("Failed to Log Out")

    }
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className = "text-center mb-4">My Page</h2> 
          { error && <Alert variant = "danger"> { error } </Alert> }
          <strong>Hello </strong>{currentUser.email}
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

