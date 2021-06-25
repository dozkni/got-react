import React, { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import CharPage from '../charPage';
import BookPage from '../bookPage';
import HousePage from '../housePage';
import GotService from "../../services/gotService";

import './app.css';

export default class App extends Component {

  gotService = new GotService();

  state = {
    showRandomChar: true,
    error: false
  }

  componentDidCatch() {
    this.setState({ error: true })
  }

  toggleRandomChar = () => {
    this.setState(state => {
      return {
        showRandomChar: !state.showRandomChar
      }
    })
  }

  render() {
    if (this.state.error) return <ErrorMessage />;

    const char = this.state.showRandomChar ? <RandomChar /> : null;

    return (
      <>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg={{ size: 5, offset: 0 }}>
              <button className="toggle-btn" onClick={this.toggleRandomChar}>Вкл/выкл RandomChar</button>
              {char}
            </Col>
          </Row>
          <CharPage />
          <BookPage />
          <HousePage />
        </Container>
      </>
    );
  }
}
