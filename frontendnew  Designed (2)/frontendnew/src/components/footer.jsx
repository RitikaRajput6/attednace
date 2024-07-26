import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Redirect,Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className='footer-section'>
      <Container>
          <Row>
            <Col className='text-center'>  <span>Copyright  &copy;</span>
            <a href="https://atappisoft.com/" target="_blank" rel="noreferrer">
          At Appisoft Technologies LLP
          </a>
                            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Footer;
