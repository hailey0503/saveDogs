import Head from "next/head";
import React from "react";
import { useEffect, useState, useRef } from "react";
import {
  Col,
  Row,
  Card,
  Alert,
  Navbar,
  Nav,
  Form,
  Container,
  Offcanvas,
  Button,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import { withProtected } from "../../src/app/routes";
import Overlay from "react-bootstrap/Overlay";
import Popover from "react-bootstrap/Popover";
import Swal from "sweetalert2";
import "animate.css";
import { GrEdit } from "react-icons/gr";
import { BsTrash } from "react-icons/bs";
import NavComp from "../../comps/NavComp.js";

function mydogs({ auth }) {
  const router = useRouter();
  const [dogs, setDogs] = useState("");
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const { currentUser, logOut } = auth;

  const loadMyDogs = async () => {
    const token = await currentUser.getIdToken();
    console.log(token);
    const cur_uid = currentUser.uid;

    const res = await fetch("http://localhost:4800/users", {
      headers: { authorization: `Bearer ${token}` },
    });
    const response = await res.json();
    console.log(response.result);
    const dogs = response.result.filter((item) => item.uid === cur_uid);
    console.log(dogs);
    setDogs(dogs);
  };

  useEffect(() => {
    if (currentUser) {
      loadMyDogs();
    }
  }, [currentUser]);

  const updateClick = async (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const deletealert = async (event, dog) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteClick(event, dog);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  const deleteClick = async (event, dog) => {
    const token = await currentUser.getIdToken();
    const dog_id = dog._id;
    const endpoint = "http://localhost:4800/users/delete/" + dog_id;
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "DELETE",
      // Tell the server we're sending JSON.
      headers: { authorization: `Bearer ${token}` },
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();

    router.reload();
  };

  const handleOverlayClose = () => {
    setShow(false);
  };
  const handleSubmit = async (event, dog) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault();
    const dog_id = dog._id;
    console.log(dog_id);
    console.log(dog.image);
    console.log(currentUser.uid);
    console.log(event.target.name.value);

    const data = new FormData();
    data.append("name", event.target.name.value);
    data.append("contact", event.target.contact.value);
    data.append("email", event.target.email.value);
    data.append("kakao", event.target.kakao.value);
    data.append("airport", event.target.airport.value);
    data.append("message", event.target.message.value);
    data.append("testImage", event.target.image.files[0]);

    const token = await currentUser.getIdToken();
    console.log(token);
    console.log(data);
    //console.log(data.testImage)
    //console.log(event.target.image)

    // API endpoint where we send form data.
    //const endpoint = process.env.API_ENDPOINT
    const endpoint = "http://localhost:4800/users/" + dog_id;
    // Form the request for sending data to the server.
    const options = {
      // The method is POST because we are sending data.
      method: "PUT",
      // Tell the server we're sending JSON.
      headers: { authorization: `Bearer ${token}` },
      // Body of the request is the JSON data we created above.
      body: data,
    };

    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options);

    // Get the response data from server as JSON.
    // If server returns the name submitted, that means the form works.
    const result = await response.json();
    //alert(`Is this your full name: ${result.body}`)
    alert(`successfully updated`);
    router.reload();
  };

  const saveChanges = async () => {
    const token = await currentUser.getIdToken();
    const res = await axios.put(
      "/users/${currentUser.uid}",
      { updates: { name } },
      { header: { authtoken: token } }
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NavComp />

      <h2>
        {" "}
        {currentUser && (
          <div className="username">
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
            's dogs
          </div>
        )}{" "}
      </h2>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Row xs={2} md={2} className="g-4">
          {dogs &&
            dogs.map((dog) => (
              <div key={dog._id}>
                <Col>
                  <Card style={{ width: "30rem", height: "30rem" }}>
                    <Card.Img
                      variant="top"
                      style={{ width: "30rem", height: "20rem" }}
                      src={" http://localhost:4800/" + dog.image}
                    />
                    <Card.Body>
                      <Card.Title>{dog.name}</Card.Title>
                      <Card.Text>
                        {dog.name} wants to go to {dog.airport}
                      </Card.Text>
                      <div className="float-container">
                        <div ref={ref}>
                          <Button className="float-child" onClick={updateClick}
                          >
                            <GrEdit />
                          </Button>

                          <Overlay
                            show={show}
                            target={target}
                            placement="right"
                            container={ref}
                            containerPadding={20}
                                   
                          >
                            <Popover id="update-popover-contained">
                              <Popover.Body width="40rem" height="90">
                                <Form onSubmit={(e) => handleSubmit(e, dog)}>
                                  <Row>
                                    <Col>
                                      <Form.Label>dog name</Form.Label>
                                      <Form.Control
                                        type="text"
                                        id="name"
                                        placeholder={dog.name}
                                      
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>photo here</Form.Label>
                                      <Form.Control
                                        type="file"
                                        id="image"
                                        multiple
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Form.Label>contact</Form.Label>
                                      <Form.Control
                                        type="phonenumber"
                                        id="contact"
                                        placeholder={dog.contact}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>email address</Form.Label>
                                      <Form.Control
                                        type="email"
                                        id="email"
                                        placeholder={dog.email}
                                      />
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col>
                                      <Form.Label>kakao</Form.Label>
                                      <Form.Control
                                        type="kakaoID"
                                        id="kakao"
                                        placeholder={dog.kakao}
                                      />
                                    </Col>
                                    <Col>
                                      <Form.Label>destination</Form.Label>
                                      <Form.Select
                                        aria-label="Default select example"
                                        id="airport"
                                      >
                                        <option>Select Airport</option>
                                        <option value="1">San Francisco</option>
                                        <option value="2">New York</option>
                                        <option value="3">Los Angeles</option>
                                        <option value="4">Toronto</option>
                                        <option value="5">Vancouver</option>
                                        <option value="6">Seattle</option>
                                      </Form.Select>
                                    </Col>
                                  </Row>
                                  <Form.Label>Message</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    id="message"
                                    rows={6}
                                    cols = {150}
                                    
                                  />
                                  <br />
                                  <Button variant="primary" type="submit">
                                    update
                                  </Button>
                                </Form>
                              </Popover.Body>
                            </Popover>
                          </Overlay>
                        </div>
                        <Button
                          className="float-child"
                          onClick={(e) => deletealert(e, dog)}
                          variant="primary"
                          type="submit"
                        >
                          <BsTrash />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </div>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default withProtected(mydogs);
