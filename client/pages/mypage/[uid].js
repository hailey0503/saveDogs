import Head from 'next/head'
import React,  { useState, useEffect } from 'react';
import { Col, Row, Card, Navbar, Nav, Container, Offcanvas, Image } from 'react-bootstrap';
import Link from 'next/link'
//import { useRouter } from 'next/navigation'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withProtected } from '../../src/app/routes';
import Stack from 'react-bootstrap/Stack';
import NavComp from "../../comps/NavComp.js";
import Map from "../../comps/map.js";
import { BsChatDots } from "react-icons/bs";




function myPage( {auth} ) {

  const { currentUser, logOut } = auth;
  const [ userInfo, setUserInfo ] = useState('');
  const [ dogs_resp, setFavDogs ] = useState("")
  const [ dogs, setDogs ] = useState("")
  
  console.log('currentUser', currentUser)
  console.log('image', currentUser.image)
  const loadUserInfo = async () => {
    const token = await currentUser.getIdToken();
    console.log(token)

  }
  const loadMyFavDogs = async () => {
    const cur_uid = currentUser.uid
    console.log('cuid', cur_uid)

    const res = await fetch('http://localhost:4800/userprofile/')
    const response = await res.json()
    console.log('mypage 30', response)
    const myData = response.result.filter(item => item.uid === cur_uid)[0]
    console.log(myData)
    if (myData != null) {
      const favDogs = myData.favorite
      console.log('fd',favDogs)

      //optimize here using localstorage
      /*

      const dogs = JSON.parse(localStorage.getItem('dogs'));
      const thisdog = dogs.result.filter(item => item._id === dog)[0];
      console.log('ddd', dogs)
      console.log('this', thisdog)
 */
      const dogs = await fetch('http://localhost:4800/dogs/')
      const dogs_data = await dogs.json()
      const dogs_result = dogs_data.result
      console.log('resp',dogs_result)
      var dogs_resp = []

            for(var d in favDogs){
              console.log('d', favDogs[d])
              dogs_resp.push(dogs_result.filter(item => item._id === favDogs[d]));
              console.log(dogs_resp.flat())
            }
                
      setFavDogs(dogs_resp.flat())
    }
  }
  const loadMyDogs = async () => {
		const token = await currentUser.getIdToken();
		console.log(token)
		const cur_uid = currentUser.uid


		const res = await fetch('http://localhost:4800/users', {
  				headers: {authorization: `Bearer ${token}`}
		})
		const response = await res.json()
		console.log(response.result)
		const dogs = response.result.filter(item => item.uid === cur_uid )
		console.log(dogs)
		setDogs(dogs)
	  
	}
  useEffect(() => {
    
    if (currentUser) {
      loadUserInfo();
      loadMyFavDogs();
      loadMyDogs();
    }
  }, [currentUser]);
  
  console.log("mypage")
  console.log(currentUser)
  console.log('setdogs', dogs.length)

 
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavComp />
      <Container style = {{ minHeight: "40vh" }}>

      <Stack direction="horizontal" gap={2}>
    
        <div className='myPageDisplayName' style = {{padding: 30, paddingBottom: 30}}>
          {!currentUser.photoURL?
          <Image
                style={{ height: '10rem'  }}
                className="d-block w-100"
                src="http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdog_9.77c974bd.jpeg&w=640&q=75"
                roundedCircle 
              />: <Image
              style={{ height: '10rem'  }}
              className="d-block w-100"
              src="currentUser.files[0].name"
              roundedCircle 
            />}
          
        </div>
        <div>
          <h2> { currentUser && <div>{currentUser.displayName? currentUser.displayName: currentUser.email}'s page</div> } </h2>
          <Link href= {{
                            pathname: `../profile/${currentUser.uid}`,
                            query: {
                              uid: currentUser.uid
                            }// the data
                          }} className = 'profile-update'>update profile</Link>
        </div>
       
       </Stack>
      </Container>
    
      <Container style = {{ minHeight: "100vh" }}>
      <div >
        <Stack gap={4}>
          <div className="favorites" > 
          <h2>{ currentUser && <div className="myHomeFavoriteDivider" style = {{padding: 30, paddingTop: 20, paddingBottom: 40}}>{currentUser.displayName? currentUser.displayName: currentUser.email}'s favorites</div> } </h2>
            <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "40vh" }}>
            <Row style = {{ display: "flex", flexWrap: "wrap", gap: "12px"}}>
              {dogs_resp? dogs_resp.map(dog => 
                <div key={dog._id} style = {{width: "fit-content"}}>
                    <Col style = {{width: "fit-content"}}>
                      <Card style={{ width: '20rem', height: '25rem' }}>
                      <Card.Img variant="top" style={{ width: '19.9rem', height: '15rem'  }} src={" http://localhost:4800/" + dog.image } />
                      <Card.Body>
                        <Card.Title>
                          { dog.name }   <a href="../chat"><BsChatDots /></a>
                        </Card.Title>
                        <Card.Text> 
                          { dog.name } wants to go to { dog.airport }
                        </Card.Text>
                        <Link href={{
                            pathname: `../detail/${dog._id}`,
                            query: {
                              dog: dog._id
                            }// the data
                          }} className="btn btn-primary w-500 mt-3">
                            click for detail
                        </Link>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              ):<h3>add favorite dogs</h3> }
              </Row>
            </Container>    
          </div> 
          <div style = {{ minHeight: "30vh" }}>
          <h2>{ currentUser && <div className="myHomeMessageDivider" style = {{padding: 30, paddingBottom: 20}}>{currentUser.displayName? currentUser.displayName: currentUser.email}'s messages</div> } </h2>
          <Container className="myHomeNumMessage" style = {{padding: 50,  paddingBottom: 40}}>
          <p>You have {length} new messages</p>
            <Link href= {{
                            pathname: `../chatroom/${currentUser.uid}`,
                            query: {
                              uid: currentUser.uid
                            }// the data
                          }}  className="btn btn-primary w-500 mt-3">
              go to chatroom
            </Link>
            </Container>             
        
          </div>
          <div style = {{ minHeight: "10vh" }}>
          <h2> { currentUser && <div className="myHomeMyDogs" style = {{padding: 30, paddingTop: 20, paddingBottom: 40}}>{currentUser.displayName? currentUser.displayName: currentUser.email}'s dogs</div> } </h2>
          <div className="myHomeNumDogs" style = {{padding: 50,  paddingTop: 10, paddingBottom: 40}}>
            <p>You have {dogs.length} dogs</p>
         
            <Link href= {{
                            pathname: `../admin/${currentUser.uid}`,
                            query: {
                              uid: currentUser.uid
                            }// the data
                          }} className="btn btn-primary w-500 mt-3">
              upload more dogs  
            </Link>
          </div>
            
          
            <Container className = "d-flex align-items-center justify-content-center" style = {{ minHeight: "40vh" }}>
            <Row style = {{ display: "flex", flexWrap: "wrap", gap: "12px"}}>
                {dogs && dogs.map(dog => 
                  <div key={dog._id}  style = {{width: "fit-content"}}>
                    <Col  style = {{width: "fit-content"}}>
                      <Card style={{ width: '20rem', height: '25rem' }}>
                    
                        <Card.Img variant="top" style={{ width: '19.9rem', height: '15rem'  }} src={" http://localhost:4800/" + dog.image } />
                        <Card.Body>
                        	<Card.Title>
                            	{ dog.name }
                          	</Card.Title>
                          	<Card.Text> 
                            	{ dog.name } wants to go to { dog.airport }
                          	</Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </div>
                  )}
          
                </Row>
              </Container>
            </div>
          </Stack>
        </div>
      </Container>  
    </>
   
  )
}

export default withProtected(myPage)
