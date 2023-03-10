import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Carousel from 'react-bootstrap/Carousel'

import Dog1 from "../public/dog_1.jpg"
import Dog2 from "../public/dog_2.jpg"
import Dog3 from "../public/dog_3.png"
import Dog4 from "../public/dog_4.jpeg"
import Dog5 from "../public/dog_5.jpeg"
import Dog6 from "../public/dog_6.jpeg"
import Dog7 from "../public/dog_7.jpeg"
import Dog8 from "../public/dog_8.jpeg"
import Dog9 from "../public/dog_9.jpeg"
import Dog10 from "../public/dog_10.jpeg"


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
        <div className="Home">
          
          <Container>
            <Carousel>
              <Carousel.Item>
                <Image
                  className="d-block w-100"
                  src={Dog8}
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h3>Dog Transport</h3>
                  <p>Help Dogs to Meet New Family</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="d-block w-100"
                  src={Dog9}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Travel with dogs</h3>
                  <p>Dogs Travel with You</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <Image
                  className="d-block w-100"
                  src={Dog10}
                  alt="Third slide"
                />

                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>



            <Form>
              <Row className="align-items-center">
                <Col xs= {5}>
                  <Form.Label htmlFor="inlineFormInput" srOnly>
                    Destination
                  </Form.Label>
                  
                    <Form.Control className="mb-2" type="text" placeholder="Destination" />
                
                </Col>

                <Col xs= {5}>
                  <Form.Label htmlFor="inlineFormInputGroup" srOnly>
                    Data
                  </Form.Label>
                  
                  
                    <Form.Control className="mb-2" type="date" id="start" name="trip-start" value="2021-01-22"
                    min="2021-01-01" max="2021-12-31" />
                  
                </Col>
                <Col xs= {2}>
                <Button type="info" className="mb-2"> Submit</Button>
                </Col>
              </Row>
            </Form>
          

            <Row xs={1} md={2} className="g-4">
              {Array.from({ length: 4 }).map((_, idx) => (
                <Col key={idx}>
                <Card>
                  <Card.Img variant="top" src="dog_1.jpg" />
                  <Card.Body>
                    <Card.Title>DOGE_1</Card.Title>
                    <Card.Text>
                      This doge wants to go to LA
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Last updated 3 mins ago</small>
                  </Card.Footer>
                </Card>
              </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>
      </main>
    </>
  )
}
