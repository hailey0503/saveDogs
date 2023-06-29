import React, { useState, useRef, useEffect } from 'react'
import { Form, Card, Container, Button, Nav, Navbar, Col, Row, InputGroup, Overlay, Popover } from 'react-bootstrap'
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import Swal from 'sweetalert2';
import 'animate.css';
import { BsChatDots } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { db } from "../src/firebase"
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore";

function DisplayDogs({ dogs }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  	
  return (
	
              <Row style = {{ display: "flex", flexWrap: "wrap", gap: "12px"}}>
                {dogs && dogs.map(dog => 
                  <div key={dog._id} style = {{width: "fit-content"}}>
                    <Col style = {{width: "fit-content"}}>
                      <Card style={{ width: '20rem', height: '30rem' }}>
                        <Card.Img variant="top" style={{ width: '20rem', height: '20rem'  }} src={" http://localhost:4800/" + dog.image } />
                        <Card.Body>
                          <Card.Title>
                            { dog.name }
                      
                            <FormControlLabel
                              control = {
                                <Checkbox
                                  icon = {<FavoriteBorderIcon />}
                                  checkedIcon = {<FavoriteIcon />}
                                  onChange=
                                  {e => addFavorite(e, dog._id)}
                                />
                              }
                              Label = "Like"
                            />
                            <div ref ={ref}>
                              <a onClick={ e => openMsg(e, dog) }><BsChatDots /></a>

                              <Overlay
                                show={show}
                                target={target}
                                placement="right"
                                container={ref}
                                containerPadding={10}
                              >
                                <Popover id="update-popover-contained">
                                <Popover.Body>
                                <Form onSubmit={e => handleSendMessage(e, dog)} >
                                  <Form.Label>Message to <a href= "../detail">{name}</a> </Form.Label>
                                  <Form.Control as="textarea" id = "message" rows={3} />
                                  <br/>
                                  <Button variant="primary" type="submit">
                                    send
                                  </Button>
                                  </Form>
                                  </Popover.Body>
                                </Popover>
                              </Overlay>
                               
                            </div>                    
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
                )}
              </Row>       
       
  );
};

export default DisplayDogs;


